//global variables
let searchBtn = document.querySelector("#searchBtn");
let inputEl = document.querySelector("#inputEl");
let city1 = document.querySelector("#city1");
let city2 = document.querySelector("#city2");
let city3 = document.querySelector("#city3");
let city4 = document.querySelector("#city4");
let city5 = document.querySelector("#city5");
let currentCityEl = document.querySelector("#currentCityEl");
let currentTempEl = document.querySelector("#currentTempEl");
let currentWindEl = document.querySelector("#currentWindEl");
let currentHumidityEl = document.querySelector("#currentHumidityEl");
let forecastEl = document.querySelector("#forecastEl");
let day1El = document.querySelector("#day1El");
let day2El = document.querySelector("#day2El");
let day3El = document.querySelector("#day3El");
let day4El = document.querySelector("#day4El");
let day5El = document.querySelector("#day5El");
let currentIconEl = document.querySelector("#currentIconEl");
let searchedCities = JSON.parse(localStorage.getItem("cities")) || [];
let searchHistoryButtons = document.querySelector("#searchHistoryButtons");

//divs on side of html

//functions
function init() {
  //grab last search results from local storage and put on left side of page


//rechange name lenghttoruntil  

  if (searchedCities.length > 0) {
    let maximumLenght = searchedCities.length >= 5 ? 5 : searchedCities.length;
    let count = 0;
    for (let i = searchedCities.length - 1; i >= 0; i--) {
      let cityHistoryButtons = document.createElement("div");
      cityHistoryButtons.innerHTML += `<button>${searchedCities[i]}</button>`;
      searchHistoryButtons.append(cityHistoryButtons);
      count++;
      if (count === maximumLenght) {
        return;
      }
    }
  } else {
    return;
  }
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
  let cityHistory = inputEl.value.trim();
  if (cityHistory === "") {
    return;
  }

  //clears search box after each time
  inputEl.value = "";

  forecastEl.innerHTML = "";

  if (!searchedCities.find((city) => city.toLowerCase() === cityHistory.toLowerCase())) {
    searchedCities.push(cityHistory);
  }

  localStorage.setItem("cities", JSON.stringify(searchedCities));

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

      // let iconCode = data.list[0].weather[0].icon;
      // let iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

      currentCityEl.innerHTML = data.city.name += data.list[0].dt_txt;
      currentTempEl.innerHTML = data.list[0].main.temp += "° F";
      currentWindEl.innerHTML = data.list[0].wind.speed += " MPH";
      currentHumidityEl.innerHTML = data.list[0].main.humidity += "%";

      //5 day forecast
      data.list.forEach((day) => {
        let midnight = day.dt_txt.split(" ")[1];
        if (midnight === "00:00:00") {
          console.log(day);
          let dayCardEl = document.createElement("div");
          // let dateEl = document.createElement("h3");
          // let tempEl = document.createElement("p");
          // let windEl = document.createElement("p");
          // let humidityEl = document.createElement("p");
          // dayCard.innerHTML += `<div>${day.dt_txt}</ div>`;
          // dayCardEl.innerHTML = "";
          dayCardEl.innerHTML += `<h1>${day.dt_txt}</h1>`;
          dayCardEl.innerHTML += `<div>Temp: ${day.main.temp}°</div>`;
          dayCardEl.innerHTML += `<div>Wind: ${day.wind.speed} MPH</div>`;
          dayCardEl.innerHTML += `<div>Humidity ${day.main.humidity} %</div>`;
          forecastEl.append(dayCardEl);
          // forecastEl.append(windEl);
          // forecastEl.append(dateEl);
          // forecastEl.append(humidityEl);
        }
      });

      // day1El.innerHTML = data.list[1].main.temp;
      // day2El.innerHTML = data.list[2].main.temp;
      // day3El.innerHTML = data.list[3].main.temp;
      // day4El.innerHTML = data.list[4].main.temp;
      // day5El.innerHTML = data.list[5].main.temp;
    });
}

//function calls

//event listeners
init();

//search button event listener
searchBtn.addEventListener("click", formSubmitHandler);

//click on past results
