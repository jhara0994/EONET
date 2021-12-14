# EONET

Project Description - This website utilizes The Earth Observatory Natural Event Tracker (EONET) to provide continuously updated natural event data We plan to create a web application that will show natural event risk factors and hold the searches in localStorage to be pulled upon request and help the user determine the natural event risk factors of their desired area. (Bonus if we can break down the events individually on the results page).

User story - As a user, I want a web application that will show a list of natural events that have occurred for a specific area within the last 365 days to determine which places are at high-risk in the next 365 days.

"Linking to enable pull push updates"

# Disaster Risk Factors

This website utilizes The Earth Observatory Natural Event Tracker (EONET) API in conjunction with the Google Maps API to provide continuously updated natural event data plotted to a global map. Users can select from several different categories to see if the area they want to know about has experienced any of that type of natural occurrence.

## User Story

```python
GIVEN the increase in major natural disaster occurrences and
the need to feel safe
WHEN I make a selection from the categories drop down
THEN I am presented with all of the events in that category
for the past 365 days and that data is stored in local storage
WHEN I scroll to the map section of the page
THEN I am presented with pin indicators on the map that shows
the location of the natural event
WHEN I click on the pin, the event nomenclature is presented
```

## Mock up

![GIF](./assets/EONET.gif)

## Contributing

[EONET API](https://eonet.gsfc.nasa.gov/)

[Google Maps API](https://developers.google.com/maps/documentation/javascript/overview)

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Developers

[Jared Haralson](https://github.com/jhara0994)

[Jing Liu]()

[Vincent Hobbs](https://github.com/icyhobbs?tab=repositories)
