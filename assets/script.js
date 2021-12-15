var searchBox = $('#searchBox')
var searchBtn = document.getElementById('searchBtn');
var compareBtn = $('#compareBtn')
var results = document.getElementById('showResults')
var mainContEl = $('.mainContainer')
var dropdown = document.querySelector('.dropdown');
var searchContEl = $('.searchContainer')
var counts = document.getElementById('showCount');
var map = $("#maps")
var volcanoImg = document.querySelector('#volcano-img')



var button = document.getElementById("searchBtn");
//user clicks on button, call function to start search
button.addEventListener ('click', startSearch);

function startSearch (event)  {
// get value from user input field
var userInputValue = document.getElementById("search").value;
var url = "https://eonet.gsfc.nasa.gov/api/v3/events/geojson"
performSearch(searchUrl);
}
console.log (startSearch)
function results () {
  var responseJSON = JSON.parse(this.response);
  // parse string into JSON
  if (responseJSON.error) console.log ("Not found");
  else{
    document.getElementById("showResults").innerHTML
  }
}
function getMap(){
    var map = new Microsoft.Maps.Map("#myMap");
}

// first we need to link the EONET API - using the function below?
// EONET - EVENT API - pull Title, Description, Link, Categories, Closed, Geometry
=======

// API Events - Category, Status, Limit, Days, Start, End

// Open Street Maps API
// may have to use some type of Geocoding API for the address to lat/log portion
// then link the Open Street Maps API and display a map on the remaining portion of the screen

// try to pinpoint locations on a map with Open Street Maps with search. 

// We will need to code the location and the number of occurrences to store in localStorage upon searching.

// then we will need to write a function that will pull the localStorage items when the Compare button is pressed.
// we will need to include a filter on the Compared Results.
// I created a separate page for the Compared Results if we need to use.
=======
// Compare Btn - then we will need to write a function that will pull the localStorage items when the Compare button is pressed. 
// we will need to include a filter on the Compared Results. 
// I created a separate page for the Compared Results if we need to use. 


/*
  Bonus: if we can complete this in time, we could code some stuff for the NavBar. If you have any suggestions for what the NavBar should include let me know. My ideas are below:
  -Highest Risk Factor (Most Dangerous) - we would have to use code from EONET to determine the top 5 places for natural even occurrences.
  -Lowest Risk Factor (Safest) - we would have to use code from EONET to determine the last 5 places for natural even occurrences.
  -Recent Events - use code from EONET to show the most recent 20 natural event occurrences.

  -Also, would be cool if we could get pictures to show or a picture carousel.
*/

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



//taken from Server-side APIs Activities 04.
function getApi() {

    // Insert the API url to get a list of your repos - need to insert the EONET API, and the Open Street Maps
    var requestUrl = 'https://api.github.com/users/jhara0994/repos';


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


=======
var getLocation = function (category) {
  var apiURL = "https://eonet.gsfc.nasa.gov/api/v2.1/events?days=365"
  fetch(apiURL)
  .then(function(response){
      response.json().then(function(data){
          console.log(data)
          displayLocation(data, category)
         
          console.log(data.events)
         // console.log(data.events.length)
                  
      })
  })
}

// display function
var displayLocation = function(data, category){
  results.innerHTML = ""
  var eventCount =0;
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
      
      console.log(data.events[i].title)
      console.log(data.events[i].categories[0].title)
      
    }

    // create event count
    counts.innerHTML = ""
    var totalEl = document.createElement('div');
    totalEl.classList = 'list-item flex-row justify-space-between align-center';

    var countEl = document.createElement('span');
    countEl.textContent = "Total event number: "+ eventCount;

    console.log(totalEl)
    console.log(document.querySelector("showCount"))
    console.log(results)
    totalEl.appendChild(countEl);  
    counts.appendChild(totalEl)
  }

// function to show map on home page, maybe more.

searchBtn.addEventListener("click", searchHandler);


// write a function to showLocation on onclick.
// write a function to showImage/showFacts onclick.

