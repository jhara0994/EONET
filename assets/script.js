// setting variables 
var searchBox = $('#searchBox')
var searchBtn = $('#searchBtn')
var compareBtn = $('#compareBtn')
var results = $('#showResults')
var mainContEl = $('.mainContainer')
var searchContEl = $('.searchContainer')
var category = $('#locSearch')

var today = moment().format('LL')

// first we need to link the EONET API - using the function below?
// EONET - EVENT API - pull Title, Description, Link, Categories, Closed, Geometry
// API Events - Category, Status, Limit, Days, Start, End
// Open Layers API ??
// may have to use some type of Geocoding API for the address to lat/log portion - ??

// then link the Open Street Maps API and display a map on the remaining portion of the screen

// Vincent
// then we need to link the search box to both APIs using an "onclick" event listener
// then we need java to display the search results in our empty div container
// simultaneously, the map on the lower portion of the screen needs to update to the city searched and include a radius.
.on()


// Jared
// We will have to write a function that will count the number of natural event occurrences.
// Limit the number of natural event occurrences to what occurred in the past year. - this can be done though search attributes
// We will need to code the category and the number of occurrences to store in localStorage upon searching.
function count() {
  var number = 

    results.textContent = category.value + number;
    localStorage.setItem = category.value;
    localStorage.setItem = number;
}
 
 

// Show the available layers for the event category
function showLayers(eventId) {
// hide the events list
    $( "#eventSelect" ).hide();
    $( "#layerSelect" ).show();
}


// then we will need to write a function that will pull the localStorage items when the Compare button is pressed. 
// we will need to include a filter on the Compared Results. 
// I created a separate page for the Compared Results if we need to use. 

/*
  Bonus: if we can complete this in time, we could code some stuff for the NavBar. If you have any suggestions for what the NavBar should include let me know. My ideas are below:
  -Highest Risk Factor (Most Dangerous) - we would have to use code from EONET to determine the top 5 places for natural even occurrences.
  -Lowest Risk Factor (Safest) - we would have to use code from EONET to determine the last 5 places for natural even occurrences.
  -Recent Events - use code from EONET to show the most recent 20 natural event occurrences.

  -Also, would be cool if we could get pictures to show or a picture carousel. 
*/




//taken from Server-side APIs Activities 04. 
function getApi() {
    // Insert the EONET API url to get a list of your repos - need to insert the EONET API, and the Open Street Maps
    var requestUrl = 'https://eonet.gsfc.nasa.gov/api/v3/events/geojson';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
  }
  
  //taken from Server-side APIs Activities 04. 
function getApi() {
  // Insert the Open Street Maps API url to get a list of your repos - need to insert the EONET API, and the Open Street Maps
  var requestUrl = 'https://api.openstreetmap.org/';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
}

