var searchBtn = document.getElementById('searchBtn');
var results = document.getElementById('showResults')
var dropdown = document.querySelector('.dropdown');
var counts = document.getElementById('showCount');
var recentEvent = document.getElementById('recent-event');
var recentResults = document.getElementById('recentResults');
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var googleMsg = document.querySelector('.google-message')
var categories = []

// Initialize and add the map
function initMap() {

}

// Drop multiple markers 
function initMap() {
  
}

// Drop multiple markers on Google Map
var mapMarkers = function(locations){

  var LocationsForMap = locations;

  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 2,
  center: new google.maps.LatLng(28.704, 77.25),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

  // var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < LocationsForMap.length; i++) {
    // console.log(`i--${i}-->: `, LocationsForMap[i])
    const geoCoordinates = LocationsForMap[i].geometries[0].coordinates;
    const geoTitle = LocationsForMap[i]['title'];
    marker = new google.maps.Marker({
    position: new google.maps.LatLng(geoCoordinates[1], geoCoordinates[0]),
    map: map
    });

    // And infowindow on map 
    const contentString = (locationName) => `
      <div id="content">
        <div id="siteNotice"> </div>
          <h1 id="firstHeading" class="firstHeading" style="color: black;">${locationName}</h1>
      </div>  
    `;
    
    const infowindow = new google.maps.InfoWindow({
    content: contentString(geoTitle), 
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.open(map, marker);
    }
    })(marker, i));
  }
};



var searchHandler = function(event){
  event.preventDefault();

  var category = event.target.getAttribute("data-category")
  console.log(category)
  if(category){
    getLocation(category);
    if (categories.includes(category) === false) categories.push(category);

  }
  googleMsg.classList.add('hide')
  saveSearch();
  pastSearch(category);
 }


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
}

// display location 
var displayLocation = function(data, category){
  results.innerHTML = ""
  var eventCount =0;
  var coordinates = data.events.filter(list => list.categories[0].title ===  category && list.geometries[0].coordinates);

  console.log('coordinates-->: ', coordinates)
  mapMarkers(coordinates)

  // Display location on list 
  for (i=0;i<data.events.length;i++){
      
    var title = data.events[i].categories[0].title
    
    // show address category is not Sea and Lake Ice
    if(title == category && title!== "Sea and Lake Ice"){
        eventCount++;
        var lngLat = data.events[i].geometries[0].coordinates
        googleMap(lngLat);
        console.log(data.events[i].title)
        //show address category is Sea and Lake Ice
    }else if(title == category && title == "Sea and Lake Ice"){
        eventCount++;
        // create events list 
        var repoEl = document.createElement('div');
          repoEl.classList = 'list-item flex-row justify-space-between align-center';
    
          var titleEl = document.createElement('span');
          titleEl.textContent = data.events[i].title;
    
          repoEl.appendChild(titleEl);
          
          results.appendChild(repoEl);
    }
  }
    
    // create event count& display event count
    counts.innerHTML = ""
    var totalEl = document.createElement('div');
    totalEl.classList = 'list-item flex-row justify-space-between align-center';

    var countEl = document.createElement('span');

    if(category === "Sea and Lake Ice") {
    countEl.textContent = "There are "+ eventCount +" "+ category+" "+"events reported!";
    } else {
      countEl.textContent = "There are " + eventCount +" "+category+" "+"reported!"
    }


    totalEl.appendChild(countEl);  
    counts.appendChild(totalEl)
  }
  // show recent events
  var showRecent = function(event){
    event.preventDefault();
    document.location.href = "./results.html";
  }

  var saveSearch = function(){
    // console.log(categories)
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  var pastSearch = function(category){
 
    // console.log(pastSearch)
    var pastCategories = JSON.parse(localStorage.getItem("categories"));
    //console.log(pastCities)
    //clear search history 
    pastSearchButtonEl.innerHTML = "";
    for (i=0; i<pastCategories.length; i++){
  
    pastSearchEl = document.createElement("span");
    pastButtonEl= document.createElement("button")
    pastButtonEl.textContent = pastCategories[i];
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastButtonEl.setAttribute("data-categories",pastCategories[i])
    pastSearchEl.setAttribute("type", "submit");
    pastSearchEl.appendChild(pastButtonEl);
    pastSearchButtonEl.appendChild(pastSearchEl);
    }
  }

  var pastSearchHandler = function(event){
    event.preventDefault();
    var category2 = event.target.getAttribute("data-categories")
    
    if(category2){
        getLocation(category2)
    }
  }

searchBtn.addEventListener("click", searchHandler);
recentEvent.addEventListener("click", showRecent);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);


// let the category button show category item when click 
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});


function storeScore() {
  localStorage.setItem("category", JSON.stringify(category))
  localStorage.setItem("number", JSON.stringify(counts))
}

function getScore() {
  var compareResults = document.querySelector("#compare-disaster")
  var compareCount = document.querySelector('#compare-count')
  var storedCat = JSON.parse(localStorage.getItem("category"))
  var storedCount = JSON.parse(localStorage.getItem("number"))

  compareResults.appendChild = storedCat 
  compareCount.appendChild = storedCount
}
