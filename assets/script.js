var searchBtn = document.getElementById('searchBtn');


var results = document.getElementById('showResults')


var dropdown = document.querySelector('.dropdown');
var counts = document.getElementById('showCount');
var recentEvent = document.getElementById('recent-event');
var recentResults = document.getElementById('recentResults')


/*
  Bonus: if we can complete this in time, we could code some stuff for the NavBar. If you have any suggestions for what the NavBar should include let me know. My ideas are below:
  -Recent Events - use code from EONET to show the most recent 20 natural event occurrences.
  -Also, would be cool if we could get pictures to show or a picture carousel. 
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
    
  }

  
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
  // var coordinates = data.events.map(list => list.categories[0].title ===  category && list.geometries[0].coordinates).filter(list=> !!list);
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
  // show recent events
  var showRecent = function(event){

    event.preventDefault();
    document.location.href = "./results.html";
    
    
  }


searchBtn.addEventListener("click", searchHandler);
recentEvent.addEventListener("click", showRecent);

// let the category button show category item when click 
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});


function storeScore() {
  localStorage.setItem("category", JSON.stringify(score))
  localStorage.setItem("number", JSON.stringify(counts))
}

function getScore() {
  var storedCat = JSON.parse(localStorage.getItem("category"))
  var storedCount = JSON.parse(localStorage.getItem("number"))

  compareResults.textContent = storedCat + storedCount
}
