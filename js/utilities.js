"use strict"


/**
* function to load Cesium and Leaflet maps when the page load has completed
* 
*/
// makes sure that the map is only loaded once the page has completely loaded
// i.e. the div for the map must exist before the code tries to load the map
document.addEventListener('DOMContentLoaded', function() {
  console.log("listener domcontentloaded");
  loadMap();
  }, false);


/**
 * Indicates if the map is currently visible on the screen.
 * @global
 * @type {boolean}
 */
let isMapVisible;


/**
 * @function
 * @description hide all the DIVs in the list : mapwrapper,cesiumWrapper,assetDataWrapperWrapper,mapAbilityWrapper
 */
function hideAllDivs(){
  isMapVisible = $('#mapWrapper').is( ":visible" );
  if (isMapVisible) {
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
        toggle: true
    });
  };

  isMapVisible = $('#cesiumWrapper').is( ":visible" );
  if (isMapVisible) {
    let mapCollapse = document.getElementById('cesiumWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
        toggle: true
    });
  };

  isMapVisible = $('#assetDataWrapperWrapper').is( ":visible" );
  if (isMapVisible) {
    let mapCollapse = document.getElementById('assetDataWrapperWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
        toggle: true
    });
  };

  isMapVisible = $('#mapAbilityWrapper').is( ":visible" );
  if (isMapVisible) {
    let mapCollapse = document.getElementById('mapAbilityWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
        toggle: true
    });
  };

}


/**
 * @function
 * @parameter {String} divName - a specific DIV name
 * @description Show a DIV given its name.  This takes the name of the DIV as a parameter.  This function calls the hideAllDivs function firstly. 
 */
function showDiv(divName){
  hideAllDivs();
  let visibleDiv = document.getElementById(divName);
  let divCollapse = new bootstrap.Collapse(visibleDiv, {
          toggle: true
  });

}


// listener to detect the screen size change
// calls processWindwoResize function
window.addEventListener('resize', processWindowResize);


/**
 * @function
 * @description The function is executed whenever the window's size changes, it firstly remove all the map data, then show the map div, 
 * <br>finally call the postResize function to do further work 
 */
function processWindowResize() {
  console.log("resize");
  // remove all the map data
  removeAllMapData(); 
  // then make sure the map div is visible - this automatically cloeses any other wrapper divs
  showDiv('mapWrapper');
  // finally call the postResize function - depending on the new screensize this can be used to add any required data layers to the map
  postResize();
}




/**
 * @function
 * @description this is a placeholder function to add any new data to the map depending on the screen width which is defined in the function(breakpoint)
 */
function postResize() {
  // detect the new screen width
  let width = $(window).width();
  console.log(width);

  // placeholder for functionality depending on screen width
  // NB - MAKE SURE TO CHANGE THE CUT-OFF VALUES USING THE BOOTSTRAP values
  // this functionality needs to be adapted as needed
  // e.g. change what happens when the user clicks on the map
  // load any required data


 let mediumBreakPoint = 768;
 let extraextralargeBreakPoint = 1400;

 // when screen size is large screen – bootstrap medium, large and extra large
 if (width < extraextralargeBreakPoint && width >= mediumBreakPoint) {    
    // clear any click functionality that already exists
    mymap.off('click');
    // when the user clicks on the map an alert should happen
    mymap.on('click', showPetrolStationForm);
  }
  
  // when screen size is mobile screen – bootstrap small and extra small)
  else if (width < mediumBreakPoint){    

    // clear any previous click functionality
    mymap.off('click');
    showPriceQueueForm()
  }
}

