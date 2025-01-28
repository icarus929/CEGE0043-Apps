"use strict"

/**
 * ethernetLayer
 * 
 * a global variable to store the ethernet layer once it has been added to the map
 * global as will need to be referened by the ethernet remove functionality
 * 
 */
let ethernetLayer;

function showEthernet(){
	// as we are hosting the data on our server, we don't need to provide the full https:// ... detail
	let layerURL = "./data/ethernet.geojson";
	$.ajax({url: layerURL, crossDomain: true,success: function(result){
			// load the geoJSON layer
    		ethernetLayer = L.geoJson(result,
        		{
            	// use point to layer to create the points
            	pointToLayer: function (feature, latlng){
		                return L.marker(latlng).bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
           		},  // end of point to layer
        }).addTo(mymap);

    	// zoom to the layer
    	mymap.fitBounds(ethernetLayer.getBounds());

		} // end of the inner function
	}); // end of the ajax request
}

function showEthernetStyled(){
	let style1 = {
          "color": "#ea3008",
          "weight": 10,
          "opacity": 0.65
    };
    let style2 = {
          "color": "pink",
          "weight": 10,
          "opacity": 0.65
    };
    let style3 = {
          "color": "#0811EA",
          "weight": 10,
          "opacity": 0.65
    };
    // as we are hosting the data on our server, we don't need to provide the full https:// ... detail
	let layerURL = "./data/ethernet.geojson";
	 $.ajax({url: layerURL, crossDomain: true,success: function(result){
			// load the geoJSON layer
	 	    // the onEachFeature command loops through every featulre in the GeoJSON dataset and creates the popup and style for each one
    		ethernetCables = L.geoJson(result, {onEachFeature: function (f, l) {
   							l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
   							switch (f.properties.criticality) {
		    		  			case 2:
					  				l.setStyle(style1);
					  				break;
					  			case 3:
					  				l.setStyle(style2);
					  				break;
					  			default:
					  				l.setStyle(style3);
					  		}

				}
			}).addTo(mymap);

	    	// change the map zoom so that all the data is shown
	    	mymap.fitBounds(ethernetCables.getBounds());

		} // end of the inner function
	}); // end of the ajax request


}
	

function removeEthernet(){
// we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
	try {
			mymap.removeLayer(ethernetLayer);
		} catch (err) {
			
	}
}