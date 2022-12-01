//global variables

let searchBtn = document.querySelector("#searchBtn");
let inputEl = document.querySelector("#inputEl");
let currentCityEl = document.querySelector("#currentCityEl");
let currentTempEl = document.querySelector("#currentTempEl");
let currentWindEl = document.querySelector("#currentWindEl");
let currentHumidityEl = document.querySelector("#currentHumidityEl");
let forecastEl = document.querySelector("#forecastEl");
let currentIconEl = document.querySelector("#currentIconEl");
let searchedCities = JSON.parse(localStorage.getItem("cities")) || [];
let searchHistoryButtons = document.querySelector("#searchHistoryButtons");
let forecastTitle = document.querySelector("#forecastTitle");
let cityCard = document.querySelector("#cityCard");

//functions

function init() {
  //grabs last search results from local storage and put on left side of page

  if (searchedCities.length > 0) {
    let maximumLenght = searchedCities.length >= 5 ? 5 : searchedCities.length;
    let count = 0;
    for (let i = searchedCities.length - 1; i >= 0; i--) {
      let cityHistoryButtons = document.createElement("button");
      cityHistoryButtons.setAttribute("data-city", searchedCities[i]);
      cityHistoryButtons.innerHTML = searchedCities[i];
      cityHistoryButtons.classList.add("w-full", "border-4", "border-black", "rounded-lg", "my-2", "text-center", "hover:bg-gray-300");
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
};

let buttonClickHandler = function (event) {
  let parentDiv = event.target;
  let cityChoice = parentDiv.getAttribute("data-city");
  if (cityChoice) {
    search(cityChoice);
  }
};

function search(cityChoice) {
  let city = inputEl.value || cityChoice;
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=6c722ab2da2f45aa2671601003f6488c&units=imperial`;
  let cityHistory = inputEl.value.trim();

  //clears search box after each time
  inputEl.value = "";

  forecastEl.innerHTML = "";
  currentCityEl.innerHTML = "";

  if (!searchedCities.find((city) => city.toLowerCase() === cityHistory.toLowerCase()) && cityHistory !== "") {
    searchedCities.push(cityHistory);
    localStorage.setItem("cities", JSON.stringify(searchedCities));
  }

  fetch(requestUrl)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      //city name, temp, wind, humidity

      let date = dayjs(data.list[0].dt_txt).format("MMMM DD, YYYY");

      currentCityEl.innerHTML = `${data.city.name} (${date})`;
      currentTempEl.innerHTML = `Temp: ${data.list[0].main.temp}° F`;
      currentWindEl.innerHTML = `Wind: ${data.list[0].wind.speed} MPH`;
      currentHumidityEl.innerHTML = `Humidity ${data.list[0].main.humidity}%`;

      let iconURL = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
      let weatherIcon = document.createElement("img");
      weatherIcon.setAttribute("src", iconURL);
      currentCityEl.append(weatherIcon);

      //5 day forecast

      cityCard.classList.remove("hidden");
      forecastTitle.innerHTML = "5 DAY FORECAST";

      data.list.forEach((day) => {
        let midnight = day.dt_txt.split(" ")[1];
        let date = dayjs(day.dt_txt).format("MMMM DD, YYYY");
        if (midnight === "00:00:00") {
          let dayCardEl = document.createElement("div");
          dayCardEl.innerHTML += `<h1 class="font-bold">${date}</h1>`;
          dayCardEl.innerHTML += `<img src="${iconURL}">`;
          dayCardEl.innerHTML += `<div>Temp: ${day.main.temp}°</div>`;
          dayCardEl.innerHTML += `<div>Wind: ${day.wind.speed} MPH</div>`;
          dayCardEl.innerHTML += `<div>Humidity ${day.main.humidity}%</div>`;
          dayCardEl.classList.add("border-4", "border-black", "rounded-lg", "p-2", "m-2", "bg-gradient-to-r", "from-cyan-500", "to-blue-500", "text-white");
          forecastEl.append(dayCardEl);
        }
      });
    });
}

//function calls

init();

//event listeners

//search button event listener
searchBtn.addEventListener("click", formSubmitHandler);

//search history button event listener
searchHistoryButtons.addEventListener("click", buttonClickHandler);
