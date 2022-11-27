//global variables
let searchBtn = document.querySelector("#searchBtn");
let inputEl = document.querySelector("#inputEl");
let currentCityEl = document.querySelector("#currentCityEl");
let currentTempEl = document.querySelector("#currentTempEl");
let currentWindEl = document.querySelector("#currentWindEl");
let currentHumidityEl = document.querySelector("#currentHumidityEl");
let day1El = document.querySelector("#day1El");
let day2El = document.querySelector("#day2El");
let day3El = document.querySelector("#day3El");
let day4El = document.querySelector("#day4El");
let day5El = document.querySelector("#day5El");
let currentIconEl = document.querySelector('#currentIconEl');

//divs on side of html

//functions
function init() {
  //grab last search results from local storage and put on left side of page
}

let formSubmitHandler = function (event) {
  event.preventDefault();
  search();
  // let city = inputEl.value;

  // if (city) {
  //   search();

  //   // repoContainerEl.textContent = '';
  //   // nameInputEl.value = '';
  // } else {
  //   alert('Please enter a GitHub username');
  // }
};


function search() {
  let city = inputEl.value;
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=6c722ab2da2f45aa2671601003f6488c&units=imperial`;
  
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.city.name);
      console.log(data.list[0].main.temp);
      console.log(data.list[0].wind.speed);
      console.log(data.list[0].main.humidity);
      console.log(data.list[0].weather[0].icon);

      //code goes here

      //city name, temp, wind, humidity

      currentCityEl.innerHTML = data.city.name;
      currentIconEl.src = data.list[0].weather[0].icon;
      currentTempEl.innerHTML = data.list[0].main.temp += "° F";
      currentWindEl.innerHTML = data.list[0].wind.speed += " MPH";
      currentHumidityEl.innerHTML = data.list[0].main.humidity += "%";

      //5 day forecast

      day1El.innerHTML = data.list[1].main.temp;


    });
}

//function calls

//event listeners
init();

//search button event listener
searchBtn.addEventListener("click", formSubmitHandler);

//click on past results
