var searchBox = $('#searchBox')
var searchBtn = $('#searchBtn')
var compareBtn = $('#compareBtn')
var results = $('#showResults')
var mainContEl = $('.mainContainer')
var searchContEl = $('.searchContainer')

// first we need to link the EONET API - using the function below?

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
// abstract holiday
var apiKey= "5356a3e909e34d7191915a86d8fcb3b6"

// festivo api key  only get past years data
//var apiKey = "f20c556217956a578c523219bd462b89"
//var apiURL =`https://holidays.abstractapi.com/v1/?api_key=${apiKey}&country=US&year=2021&month=11&day=25 `;
fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events")
    .then(function(response){
        response.json().then(function(data){
            console.log(data)
            
        });
    });

//taken from Server-side APIs Activities 04. 
function getApi() {
    // Insert the API url to get a list of your repos - need to insert the EONET API, and the Open Street Maps
    var requestUrl = 'https://api.github.com/users/jhara0994/repos';
  
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
  

