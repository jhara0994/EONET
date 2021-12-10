var searchBox = $('#searchBox')
var searchBtn = document.getElementById('searchBtn');
var compareBtn = $('#compareBtn')
var results = document.getElementById('showResults')
var mainContEl = $('.mainContainer')
var dropdown = document.querySelector('.dropdown');
var searchContEl = $('.searchContainer')
var counts = document.getElementById('showCount');
var map = $("#maps")


// API Events - Category, Status, Limit, Days, Start, End

// Open Street Maps API
// may have to use some type of Geocoding API for the address to lat/log portion
// then link the Open Street Maps API and display a map on the remaining portion of the screen

// try to pinpoint locations on a map with Open Street Maps with search. 

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

// function to pull Open Layers API and console log

//function to fetch Mapquest API

function showMap() {
  var mapUrl = "http://map.positionstack.com/47.735549,-94.548447"
  
}

searchBtn.addEventListener("click", searchHandler);