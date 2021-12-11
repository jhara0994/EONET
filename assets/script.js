var searchBox = $('#searchBox')
var searchBtn = document.getElementById('searchBtn');
//var searchBtn = $('#searchBtn');
var compareBtn = $('#compareBtn')
var results = document.getElementById('showResults')
var mainContEl = $('.mainContainer')
var searchContEl = $('.searchContainer')
var dropdown = document.querySelector('.dropdown');
var counts = document.getElementById('showCount');
// var modalButton = document.querySelector(".modal-button")
// var showModal = document.querySelector(".modal")
// var closeModal = document.querySelector(".modal-close")



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

  // // show modal
// modalButton.addEventListener('click', function(event) {
//   event.stopPropagation();
//   showModal.classList.toggle('is-active');
// });
// //close modal

// closeModal.addEventListener('click', function(event) {
//   event.stopPropagation();
//   showModal.classList.toggle('is-active');
// });
*/

// Initialize and add the map
function initMap() {
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

}

// Drop multiple markers 
var mapMarkers = function(locations){

  var LocationsForMap = locations;

  var map = new google.maps.Map(document.getElementById('map'), {
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

  
}

//Fetch data from MapRequest


//Fetching data from EONET
var getLocation = function (category) {
    var apiURL = "https://eonet.gsfc.nasa.gov/api/v2.1/events?days=365"
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            console.log(data)
            //displayLocation(data, category)
            displayLocation(data, category)
           
            console.log(data.events)
           // console.log(data.events.length)
                    
        });
    });
  // Google map data fetch
}
  var googleMap = function (lngLat) {
    console.log("lngLast---->", lngLat)
    

    var apiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lngLat[1]},${lngLat[0]}&location_type=APPROXIMATE&key=AIzaSyCG0vKsx0zUzUjb9o7A86MdauceuRZYk1w`
    
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            console.log("show filter data--->", data)
            // create event list 
          var repoEl = document.createElement('div');
          repoEl.classList = 'list-item flex-row justify-space-between align-center';
    
          var titleEl = document.createElement('span');
          titleEl.textContent = data.results[0].formatted_address;
    
          repoEl.appendChild(titleEl);
          
          results.appendChild(repoEl);
            //displayLocation(data, category)
           
            //console.log(data.events)
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
    
    // show address category is not Sea and Lake Ice
    if(title == category && title!== "Sea and Lake Ice"){
        eventCount++;
        var lngLat = data.events[i].geometries[0].coordinates
        console.log(lngLat)
        googleMap(lngLat);
        console.log(data.events[i].title)
        //show address category is Sea and Lake Ice
    }else if(title == category && title == "Sea and Lake Ice"){
        console.log("iceberg: ", data.events[i].title)
        eventCount++;
        // create events list 
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
    
    // create event count& display event count
    counts.innerHTML = ""
    var totalEl = document.createElement('div');
    totalEl.classList = 'list-item flex-row justify-space-between align-center';

    var countEl = document.createElement('span');
    countEl.textContent = "There are "+ eventCount +" reported events";

    // console.log(totalEl)
    // console.log(document.querySelector("showCount"))
    // console.log(results)
    totalEl.appendChild(countEl);  
    counts.appendChild(totalEl)
  }
   

searchBtn.addEventListener("click", searchHandler);





 




































//taken from Server-side APIs Activities 04. 
function getApi() {
    // Insert the EONET API url to get a list of your repos - need to insert the EONET API, and the Open Street Maps
    var requestUrl = 'https://eonet.gsfc.nasa.gov/api/v3/events/geojson';
   
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
          repoList.appendChild(listItem);
        }
      });
  }
  
  //taken from Server-side APIs Activities 04. 
function getApi() {
  // Insert the Open Street Maps API url to get a list of your repos - need to insert the EONET API, and the Open Street Maps
  var requestUrl = 'https://api.openstreetmap.org/';

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
        repoList.appendChild(listItem);
      }
    });
}

