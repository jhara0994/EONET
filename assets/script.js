var searchBox = $('#searchBox')
var searchBtn = document.getElementById('searchBtn');
//var searchBtn = $('#searchBtn');
var compareBtn = $('#compareBtn')
var compareResults = document.querySelector('#compare-results')
var results = document.getElementById('showResults')
var mainContEl = $('.mainContainer')
var searchContEl = $('.searchContainer')
var dropdown = document.querySelector('.dropdown');
var counts = document.getElementById('showCount');
var maps = document.querySelector('#maps')

// first we need to link the EONET API - using the function below?
// EONET - EVENT API - pull Title, Description, Link, Categories, Closed, Geometry
// API Events - Category, Status, Limit, Days, Start, End
// Open Layers API
// may have to use some type of Geocoding API for the address to lat/log portion

// then link the Open Street Maps API and display a map on the remaining portion of the screen

// then we need to link the search box to both API using an "onclick" event listener

// then we need java to display the search results in our empty div container
// simultaneously, the map on the lower portion of the screen needs to update to the city searched and include a radius.

// We will have to write a function that will count the number of natural event occurrences.

// We will need to code the location and the number of occurrences to store in localStorage upon searching.

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


/* Useful get data information 
// get categories
    //console.log(data.events[i].categories[0].title)
 // get location
    // console.log(data.events[i].title)
// split location--> Siskiyou County (Antelope Fire), California, United States---> get [Siskiyou County (Antelope Fire)],[California], [United States]
      // console.log(location.split(",")[1])
      // console.log(typeof(location.split(",")[1]))
//only locate united states
      // if(data.events[i].title.includes("United States")){
      //   console.log(data.events[i].title)
      // //   console.log(location.split(",")[1])
      // }
  This a free weather api : https://www.weatherusa.net/services/weather-api
  // google map api key:AIzaSyCG0vKsx0zUzUjb9o7A86MdauceuRZYk1w
*/

// Initialize and add the map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  })
}
  // // The location of Uluru
  // const uluru = {
  //   lat: 33.417201559,
  //   lng:-110.861196043,
  // };
  // // The map, centered at Uluru
  // const map = new google.maps.Map(document.getElementById("map"), {
  //   zoom: 4,
  //   center: uluru,
  // });
  // // The marker, positioned at Uluru
  // const marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
  // });

maps.textContent = initMap()

// Drop mutiple markers 
var mapMarkers = function(locations){

  var LocationsForMap = locations;

var map =  google.maps.Map(document.getElementById('map'), {
  zoom: 2,
  center: new google.maps.LatLng(28.704, 77.25),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < LocationsForMap.length; i++) {  
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(LocationsForMap[i][1], LocationsForMap[i][0]),
    map: map
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.open(map, marker);
    }
  })(marker, i));
}
};

// let the category button show category item when click 
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});
var searchHandler = function(event){
  //event.preventDefault();

  var category = event.target.getAttribute("data-category")
  console.log(category)
  if(category){
    getLocation(category);
    
  }

  
  //Fetching data from EONET, and t
  var getLocation = function (category) {
    var apiURL = "https://eonet.gsfc.nasa.gov/api/v2.1/events?days=365"
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            console.log(data)
            displayLocation(data, category)
           
            console.log(data.events)
           // console.log(data.events.length)
                    
        });
    });
  
  // if(city){
  //     getCityWeather(city);
  //     get5Day(city);
  //     // add city to the first of the array use cities.unshift(city); if add city to last element, use .push
  //     cities.push(city);
  //     // clear search 
  //     cityInputEl.value = "";
  // } else{
  //     alert("Please enter a City");
  // }
  // saveSearch();
  // pastSearch(city);
  
}

// display location 
var displayLocation = function(data, category){
  results.innerHTML = ""
  var eventCount =0;
  // display location by using google map 
  // console.log('data-->: ', data)
  var coordinates = data.events.map(list => list.categories[0].title ===  category && list.geometries[0].coordinates).filter(list=> !!list);
  console.log('coordinates-->: ', coordinates)
  mapMarkers(coordinates)
  // Display location on list 
  for (i=0;i<data.events.length;i++){
      
    var title = data.events[i].categories[0].title
    if(title == category){
        eventCount++;
      // create event list 
        var repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';
    
        var titleEl = document.createElement('span');
        titleEl.textContent = data.events[i].title;
    
        repoEl.appendChild(titleEl);
          
        results.appendChild(repoEl);
        
      }
      
      // console.log(data.events[i].title)
      // console.log(data.events[i].categories[0].title)
      
    }
    // Display event count 
    // create event count
    counts.innerHTML = ""
    var totalEl = document.createElement('div');
    totalEl.classList = 'list-item flex-row justify-space-between align-center';

    var countEl = document.createElement('span');
    countEl.textContent = "Total event number: "+ eventCount;

    // console.log(totalEl)
    // console.log(document.querySelector("showCount"))
    // console.log(results)
    totalEl.appendChild(countEl);  
    counts.appendChild(totalEl)
  }
}


    //taken from Server-side APIs Activities 04. 
function getGoogleMaps() {
  // Insert the Open Street Maps API url  - need to insert the EONET API, and the Open Street Maps
  var apiKey = 'AIzaSyCG0vKsx0zUzUjb9o7A86MdauceuRZYk1w'
  var requestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //looping over the fetch response and inserting the URL of your repos into a list
      for (var i = 0; i < data.length; i++) {
        //Create a list element
        var listItem = document.createElement('li');

        //Set the text of the list element to the JSON response's .html_url property
        listItem.textContent = data[i].html_url;

        //Append the li element to the id associated with the ul element.
        results.appendChild(listItem);
      }
    })
  }

searchBtn.addEventListener("click", searchHandler);
searchBtn.addEventListener("click", getGoogleMaps);

// For tomorrow, I am writing the stored event numbers into localStorage and pulling them on the compare button page. 
function storeScore() {
  localStorage.setItem("category", JSON.stringify(score))
  localStorage.setItem("number", JSON.stringify(counts))
}

function getScore() {
  var storedCat = JSON.parse(localStorage.getItem("category"))
  var storedCount = JSON.parse(localStorage.getItem("number"))

  compareResults.textContent = storedCat + storedCount
}

// eventCount on line 247 and 277
// most recent event linked to Recent Events
// style - image under drop-downs and columns for the data
// CSS media queries to be added.

// For Tuesday, finish coding to main and ensure it displays on 
