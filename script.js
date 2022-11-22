//global variables
let searchBtn = document.querySelector("#searchBtn");

//divs on side of html

//functions
function init() {
  //grab last search results from local storage and put on left side of page
}

function search() {
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {});
  console.log(data);

  //code goes here

  //chicago

  //temp, wind, humidity

  //5 day forecast
}

//function calls

//event listeners
init();

//search button event listener
searchBtn.addEventListener("click", search);

//click on past results
