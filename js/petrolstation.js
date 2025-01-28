"use strict"

// Declare global variables to store the latitude and longitude and user ID
let clickLat = 0;
let clickLng = 0;
let userId = null; 

// async function to get the user ID
async function getUserId() {
    let userIdUrl = document.location.origin + "/api/crud24/userId";
    const response = await fetch(userIdUrl);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.user_id; // Return user ID directly
}


/**
 * @function 
 * @discription  This function handles the map click event, it calls the petrol station creation
 * <br>form when clicking on the map, the form will pop up on the map
 */
function showPetrolStationForm(e) {

    // Store the latitude and longitude of the click event
    clickLat = e.latlng.lat;
    clickLng = e.latlng.lng;

    // Load the dialog using an AJAX request
    let formURL = "../dialogs/petrolstationDialog.txt";
    $.ajax({
        url: formURL, 
        crossDomain: true,
        success: function(result) {
            // Create a new Leaflet popup and set its content
            let popup = L.popup()
                .setLatLng(e.latlng) // Set the location for the popup
                .setContent(result.toString()) // Set the content of the popup with the form
                .openOn(mymap); // Add the popup to the map and open it
        }
    });
}


/**
 * @function 
 * @discription this function is called by clicking the cancel button on the petrol station creation form to close the form
 */
function closePetrolStationForm() {
   mymap.closePopup(); // This will close the currently open popup
}


/**
 * @function 
 * @discription this function is called by clicking the save button on the petrol station creation form to submit the form
 */
async function processPetrolStationData() {
    if (userId === null) {
        userId = await getUserId(); // Wait to get the user ID
    }
    let petrolStationName = document.getElementById('petrolStationName').value;
    let lastInspected = document.getElementById('lastInspected').value;

    // Construct the string to send all values to the server
    let postString ="userId=" + userId+"&petrolStationName=" + petrolStationName + "&lastInspected=" + lastInspected+ "&latitude=" + clickLat + "&longitude=" + clickLng;
    console.log(postString);

    closePetrolStationForm();

    // AJAX call to upload the data goes here
    let serviceUrl = document.location.origin + "/api/crud24/testCRUD";
    console.log(serviceUrl);
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "GET",
        success: function(result) {
            console.log(result);
            alert(JSON.stringify(result));
        },
        data: postString
    }); // end of the ajax request
}


/**
 * @function 
 * @discription  this function shows the hardcoded point on the map, and then add click events on these markers to show the price/queue form
 */
function showPriceQueueForm(){

   // Define the green marker icon using Leaflet Awesome Markers
  let testMarkerGreen = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'green'
  });

  // Array of hardcoded points with latitude and longitude
  const points = [
    { lat: 51.500150, lng: -0.126240 },
    { lat: 51.500333, lng: -0.127502 },
    { lat: 51.501075, lng: -0.127481 }
  ];

  // Create a feature group to hold all markers
  let markersGroup = L.featureGroup();

  // Iterate through each point and create a marker
  points.forEach(point => {
    let newMarker = L.marker([point.lat, point.lng], { icon: testMarkerGreen })
      .on('click', showPriceQueueDialog) // Attach showDialog event on marker click
      .addTo(markersGroup); // Add marker to the feature group
  }); 

  // Add the feature group to the map
  markersGroup.addTo(mymap);

  // Adjust the map view to fit the bounds of the feature group containing all markers
  mymap.fitBounds(markersGroup.getBounds());
}




/**
 * @function 
 * @discription  processes the click event on the marker to show price/queue dialog
 */
function showPriceQueueDialog(e){

   // create a new Leaflet popup
   let popup = L.popup();

   // define some variables to store data that we need to use once we have the dialog HTML
   // in this case the word  this refers to the marker that the user cliked on 
   // (in geneeral this in JavaScript events this is the element that received the event - which could be a button, a map, a div, a marker etc)

   // we need to get the unique identifier of the earthquake - the code - so that we know that the damage data is linked to the correct earthquake
   // let earthquakeCode =this.feature.properties.code;
   
   // we also need the marker to attach the popup to
   let marker = this;
   

   // we will load the dialog using an AJAX request
   let formURL = "../dialogs/pricequeueDialog.txt";
   $.ajax({url: formURL, crossDomain: true,success: function(result){
      console.log(result);
      loadQueueOptions();
      let form = result.toString();
      // set the content of the popup to include the earthquake code identifier and then the form
      popup.setContent(form);

      // set an event to remove and destroy the form when the popup is closed
      // this means that we don't end up with duplicate earthquakeCode DIVs
      popup.on('remove', closePriceQueueForm);

      // add the popup to the marker
      marker.bindPopup(popup).openPopup();

   } // end of the inner function
   }); // end of the ajax request
}


/**
 * @function 
 * @discription  destroys the DIV and its contents every time the user closes the form
 */
function closePriceQueueForm(){
   // we need to destroy the form when the popup is closed
   // so that we never end up with more than one DIV or INPUT box etc with the same ID (if the form is loaaded onto another earthquake point)
   // use the remove() option to completely destroy the surrounding div and its contents

   // this function is called by the close button but also by the on remove function which is triggered when the pop-up is closed
   // two situations happen
   // 1. the top cross is used to close the popup - i.e. the inbuilt functionality
   //        in that case, the form is removed

   // 2. clicking the close button destroys the form, 
   //    but then the on remove button will try to destroy it again and won't find it so will 
   // throw an error
   try {
      document.getElementById('priceQueueForm').remove();
   } catch (e) {
      // no need to do anything
      // the error will happen as the 'on remove' event is triggered by the close or save events
      // but they 
   }

}


/**
 * @function 
 * @description  retrieve radio button options from the database and set it into the placeholder div in the price/queue form
 */
function loadQueueOptions() {
  // AJAX call to retrieve radio button options from the database
  let serviceUrl = document.location.origin + "/api/geojson24/getQueueLengths";
  $.ajax({
    url: serviceUrl,
    type: "GET",
    success: function(data) {
      // This will hold the HTML for the radio buttons
      let radioButtonsHtml = '';

      // Loop over each option and create a radio button
      data.forEach(function(option) {
        radioButtonsHtml +=
          '<div class="form-check">' +
          '<input class="form-check-input" type="radio" name="queueLengthOptions" id="queueOption' + option.queue_length_id + '" value="' + option.queue_length_id + '">' +
          '<label class="form-check-label" for="queueOption' + option.queue_length_id + '">' +
          option.queue_length_description +
          '</label>' +
          '</div>';
      });

      // Insert the radio buttons HTML into the placeholder div
      // console.log(radioButtonsHtml)
      $('#radioButtonsPlaceholder').html(radioButtonsHtml);
    },
    error: function(xhr, status, error) {
      console.error("An error occurred while loading queue options:", status, error);
    }
  });
}



/**
 * @function 
 * @discription this function is called by clicking the save button on the price/queue report form to submit the form
 */
function processPriceQueueData() {
    // Retrieve selected queue length description
    let selectedQueueLengthDescription = $("input[name='queueLengthOptions']:checked").next('label').text();
    console.log(selectedQueueLengthDescription);

    let petrolStationName = document.getElementById('petrolStationName').value;
    let pricePerLitre = document.getElementById('pricePerLitre').value;
    // Construct the string to send all values to the server including the queue length
    let postString = "userId=" + userId +
                     "&petrolStationName=" + petrolStationName +
                     "&pricePerLitre=" + pricePerLitre +
                     "&selectedQueueLengthDescription=" + selectedQueueLengthDescription;

    console.log(postString);

    mymap.closePopup();
    // closePriceQueueForm();

    // AJAX call to upload the data goes here
    let serviceUrl = document.location.origin + "/api/crud24/testCRUD";
    console.log(serviceUrl);
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "GET",
        success: function(result) {
            console.log(result);
            alert(JSON.stringify(result));
        },
        data: postString
    }); // end of the second ajax request
}


//-------------------
/**
 * @function 
 * @discription  This function will show a list of all the petrol stations that have at least one report (at any point in time) 
 * <br>saying that they have the lowest queuing time
 */
function showShortestQueueStationList() {
    alert("Functionality to create a list of all the petrol stations that have at least one report (at any point in time) saying that they have the lowest queuing time")
}

/**
 * @function 
 * @discription  This function will create a bar graph showing the number of petrol stations grouped by the value of with their latest known waiting type
 */
function showBarGraph() {
    alert("Functionality to create a bar graph showing the number of petrol stations grouped by the value of with their latest known waiting type")
}

//-------------------
/**
 * @function 
 * @discription  This function will show the ranking of the user based on number of reports created (in comparison to all other users)
 */
function showUserRanking() {
    alert("Functionality to show the ranking of the user based on number of reports created (in comparison to all other users)")
}

/**
 * @function 
 * @discription  This function will show the layer of the 5 petrol stations closest to the user’s current location, added by any user
 */
function show5ClosestStation() {
    alert("Functionality to show the layer of the 5 petrol stations closest to the user’s current location, added by any user")
}

/**
 * @function 
 * @discription  This function will remove the 5 petrol stations closest to the user’s current location
 */
function remove5ClosestStation() {
    alert("Functionality to remove layer of the 5 petrol stations closest to the user’s current location")
}



/**
 * @function 
 * @discription  This function will show the layer of the petrol stations for your user where queue length is unknown
 */
function showQueueLengthUnknown() {
    alert("Functionality to show the layer of the petrol stations for your user where queue length is unknown")
}

/**
 * @function 
 * @discription  This function will remove the layer of the petrol stations for your user where queue length is unknown
 */
function removeQueueLengthUnknown() {
    alert("Functionality to remove the layer of the petrol stations for your user where queue length is unknown")
}


/**
 * @function 
 * @discription  This function will show the layer of the user’s petrol stations that haven’t had price/queue information submitted in the last 3 days
 */
function showNoPriceLast3Days() {
    alert("Functionality to show the layer of the user’s petrol stations that haven’t had price/queue information submitted in the last 3 days")
}

/**
 * @function 
 * @discription  This function will remove the layer of the user’s petrol stations that haven’t had price/queue information submitted in the last 3 days
 */
function removeNoPriceLast3Days() {
    alert("Functionality to remove the layer of the user’s petrol stations that haven’t had price/queue information submitted in the last 3 days")
}

