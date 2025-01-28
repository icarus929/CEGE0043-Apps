"use strict"


/**
 * buildingsLayer
 * 
 * a global variable to store the buildings layer once it has been added to the map
 * <br>global as will need to be referened by the buildings layer remove functionality
 * 
 */
let buildingsLayer;


/**
 * @function showBuildings
 * 
 * @description show the buildings layer, which is served via the dataAPI from the centennial database
 * 
 */
function showBuildings(){
	if (buildingsLayer) {
        mymap.removeLayer(buildingsLayer);
    }
	let layerURL = document.location.origin + "/api/geojson24/getGeoJSON/"+"ucfscde/buildings/building_id/location";
	$.ajax({url: layerURL, crossDomain: true,success: function(result){

    		// add the JSON layer onto the map - it will appear using the default icons
	 		// the onEachFeature command loops through every featulre in the GeoJSON dataset and creates the popup for each one
    		buildingsLayer = L.geoJson(result, {
				onEachFeature: function (f, l) {
					l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
				}
			}).addTo(mymap);

    		// change the map zoom so that all the data is shown
    		mymap.fitBounds(buildingsLayer.getBounds());
		} // end of the inner function
	}); // end of the ajax request
}

/**
 * @function removeBuildings
 * 
 * @description remove the buildings layer showed on the map
 * 
 */

function removeBuildings(){
	// we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
	try {
			mymap.removeLayer(buildingsLayer);
		} catch (err) {

	}
}



/**
 * universityLayer
 * 
 * a global variable to store the university layer once it has been added to the map
 * <br>global as will need to be referened by the university layer remove functionality
 * 
 */
let universityLayer;


/**
 * @function showUniversity
 * 
 * @description show the university layer, which is served via the dataAPI from the centennial database
 * 
 */
function showUniversity(){
	if (universityLayer) {
        mymap.removeLayer(universityLayer);
    }
	let layerURL = document.location.origin + "/api/geojson24/getGeoJSON/"+"ucfscde/university/university_id/location";
	$.ajax({url: layerURL, crossDomain: true,success: function(result){

    		// add the JSON layer onto the map - it will appear using the default icons
	 		// the onEachFeature command loops through every featulre in the GeoJSON dataset and creates the popup for each one
    		universityLayer = L.geoJson(result, {
				onEachFeature: function (f, l) {
					l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
				}
			}).addTo(mymap);

    		// change the map zoom so that all the data is shown
    		mymap.fitBounds(universityLayer.getBounds());
		} // end of the inner function
	}); // end of the ajax request
}


/**
 * @function removeUniversity
 * 
 * @description remove the university layer showed on the map
 * 
 */

function removeUniversity(){
	// we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
	try {
			mymap.removeLayer(universityLayer);
		} catch (err) {

	}

}


/**
 * roomsLayer
 * 
 * a global variable to store the rooms layer once it has been added to the map
 * <br>global as will need to be referened by the rooms layer remove functionality
 * 
 */
let roomsLayer;


/**
 * @function showRooms
 * 
 * @description show the rooms layer, which is served via the dataAPI from the centennial database
 * 
 */
function showRooms(){
	if (roomsLayer) {
        mymap.removeLayer(roomsLayer);
    }
	let layerURL = document.location.origin + "/api/geojson24/getGeoJSON/"+"ucfscde/rooms/room_id/location";
	$.ajax({url: layerURL, crossDomain: true,success: function(result){

    		// add the JSON layer onto the map - it will appear using the default icons
	 		// the onEachFeature command loops through every featulre in the GeoJSON dataset and creates the popup for each one
    		roomsLayer = L.geoJson(result, {
				onEachFeature: function (f, l) {
					l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
				}
			}).addTo(mymap);

    		// change the map zoom so that all the data is shown
    		mymap.fitBounds(roomsLayer.getBounds());
		} // end of the inner function
	}); // end of the ajax request
}

/**
 * @function removeRooms
 * 
 * @description remove the rooms layer showed on the map
 * 
 */

function removeRooms(){
	// we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
	try {
			mymap.removeLayer(roomsLayer);
		} catch (err) {

	}
}


/**
 * temperature_sensorsLayer
 * 
 * a global variable to store the temperature sensors layer once it has been added to the map
 * <br>global as will need to be referened by the temperature sensors layer remove functionality
 * 
 */
let temperature_sensorsLayer;


/**
 * @function showTemperature_sensors
 * 
 * @description show the temperature sensors layer, which is served via the dataAPI from the centennial database
 * 
 */
function showTemperature_sensors(){
	if (temperature_sensorsLayer) {
        mymap.removeLayer(temperature_sensorsLayer);
    }
	let layerURL = document.location.origin + "/api/geojson24/getGeoJSON/"+"ucfscde/temperature_sensors/sensor_id/location";
	$.ajax({url: layerURL, crossDomain: true,success: function(result){

    		// add the JSON layer onto the map - it will appear using the default icons
	 		// the onEachFeature command loops through every featulre in the GeoJSON dataset and creates the popup for each one
    		temperature_sensorsLayer = L.geoJson(result, {
				onEachFeature: function (f, l) {
					l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
				}
			}).addTo(mymap);

    		// change the map zoom so that all the data is shown
    		mymap.fitBounds(temperature_sensorsLayer.getBounds());
		} // end of the inner function
	}); // end of the ajax request
}


/**
 * @function removeTemperature_sensors
 * 
 * @description remove the temperature sensors layer showed in the map
 * 
 */

function removeTemperature_sensors(){
	// we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
	try {
			mymap.removeLayer(temperature_sensorsLayer);
		} catch (err) {

	}
}
