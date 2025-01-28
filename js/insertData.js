"use strict"


/**
 * @function
 * @description test inserting data into a table in the database by sending a string to the server api end point
 * <br>the string is hard coded data for testing purposes
 */
function testInsertData(){
	// create a fake string of hard-coded data
	// to test the process of inserting data into a database
	let postString = "name=qq&surname=ww&module=cege0043&latitude=111&longitude=222&language=English&lecturetime=rr&modulelist=cege0043,cege0052";

	// create the AJAX call
	// make sure to use document.location.origin - don't hard code the URL
	let serviceUrl= document.location.origin+"/api/crud24/insertTestFormData";
	console.log(serviceUrl);
	$.ajax({
		url: serviceUrl,
		crossDomain: true,
		type: "POST",
		success: insertResult,
		data: postString
	});
}



/**
 * @function
 * @description A function that will be called when the AJAX result returns, which is an alert message that informs the data has been inserted successfully.
 */
function insertResult(result){
	// result here is the message sent by the res.send command in the API
	alert(result);
}