'use strict'

/**
 * @function
 * @description show the earthquakes graph
 */

function showEarthquakesGraph(){
  showDiv('assetDataWrapperWrapper');

   // Add the close button
  document.getElementById("assetDataWrapperWrapper").innerHTML= `<div><button type="button" class="btn btn-primary ms-4" onclick="closeAssetData()">Close Graph</button>'
  + <div id="assetDataWrapper" class="vw-100" style="height:calc(100% - 165px);width:100%;border-color='blue';border-width=5px;"> 
  </div>`;

  // we then need to set a short delay before we try to meaure the height and width of the DIV to hold the graph
  // this is because the height and width are not correctly set until the DIV is fully rendered
  // so use setTimeout to set the dealy - 5000 milli-seconds
  // and then call a function called measureDiv to measure the div and start loading the graph
  setTimeout(measureDivLoadGraph, 5000);

} 


/**
 * @function
 * @description this function calls the showDiv function to show the 'mapWrapper'DIV
 */
function closeAssetData(){
    showDiv('mapWrapper');
}



/**
 * @function
 * @description this function measures the height and width of the DIV to hold the graph
 */
function measureDivLoadGraph(){
  let widtha = document.getElementById("assetDataWrapperWrapper").offsetWidth;
  console.log("width is " + widtha);
  let heighta = document.getElementById("assetDataWrapperWrapper").offsetHeight;

  // add an  SVG element for the graph
  document.getElementById("assetDataWrapper").innerHTML += `<svg fill="blue" width="`+widtha+`" height="`+heighta+`" id="svg1">
  </svg><div>`;

  let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
  // download the data and call the function to create the graph
  // this is another way of writing an AJAX request called a promise
  // instead of using the success  parameter to define which function is called when the data is returned by the AJAX request, we use the .then option
  // .then tells the code what to do as the next step - i.e. do this (retrieve the data from AJAX) THEN once that is done call this function
  d3.json(dataURL).then(function(data){showGraph(data)});

}



/**
 * @function
 * @parameter 
 * @description the function is called by the promise .then statement above to render the graph based on the retrieved data
 */
function showGraph(data){
  //extract the features from the downloaded data
  data = data.features;

  //set some default values for margins
  let marginTop = 30;
  let marginBottom = 260;
  let marginLeft = 50;
  let marginRight=20;

  // loop through the data and get the length of the x axis titles
  let xLen = 0;
  data.forEach(feature =>{
    if (xLen < feature.properties.title.length) {
      xLen = feature.properties.title.length;
    }
    console.log(xLen);
  });

  // adjust the space available for the x-axis titles, depending on the length of the text
  if (xLen > 100) {
    marginBottom = Math.round(xLen/3,0) + 120; // the 120 allows for the close button
  }
  else {
    marginBottom = xLen + 120;  // the 120 allows for the close button 
  } 

  // g is a grouping element
  // in SVG this is the letter used to name the element that contains all the other SVG elements 
  // so all the other SVG elements (e.g. the bars and text of the graph) are appended (added) to g
  let svg     = d3.select("#svg1"),
      margin  = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft},
      width   = svg.attr("width") - marginLeft - marginRight,
      height  = svg.attr("height") - marginTop - marginBottom,
      x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
      y       = d3.scaleLinear().rangeRound([height, 0]),
      g       = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  x.domain(data.map(d => d.properties.title));
  y.domain([0, d3.max(data, d => d.properties.mag)]);

  // adapted from: https://bl.ocks.org/mbostock/7555321 10th March 2021/
  g.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
      .call(wrap,x.bandwidth());

  g.append("g")
    .attr("class", "axis axis-y")
    .call(d3.axisLeft(y).ticks(10).tickSize(8));

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.properties.title))
      .attr("y", d => y(d.properties.mag))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.properties.mag));
}


/**
 * @function
 * @description a function to wrap the text(X-axis labels) that might be quite long,so that they display correctly
 */
function wrap(text, width) {
  text.each(function() {
    let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}


/**
 * @function
 * @description show the Leaflet DIV and hide all the other DIVs
 */
function hideGraph(){
  showDiv('mapWrapper');
}
