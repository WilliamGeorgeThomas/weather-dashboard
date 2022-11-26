//global variables
let searchBtn = document.querySelector("#searchBtn");

//divs on side of html

//functions
function init() {
  //grab last search results from local storage and put on left side of page
}



let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Chicago&appid=6c722ab2da2f45aa2671601003f6488c'

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
