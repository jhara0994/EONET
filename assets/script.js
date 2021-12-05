
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
  