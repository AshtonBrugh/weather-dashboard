var userFormEl = document.querySelector("#user-form");
var userCity = document.querySelector("#city");
var weatherContainer = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#city-search-term");
var apiKey = "a9792d86ad12efe56b0f259d2b28f7cc&units=imperial";
var currentTemp = document.querySelector("#temperature");


var formSubmitHandler = function(event) {
  event.preventDefault();

//get the value from the input element
var cityInput = userCity.value.trim();

if(cityInput) {
  currentWeather(cityInput);
  userCity.value = "";
} else {
  alert("Please enter a city!")
}
};

userFormEl.addEventListener("submit", formSubmitHandler);

var currentWeather = function(city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      displayWeather(data, city);
      
    });

  });
};

var displayWeather = function(weather) {
  console.log(weather);
  var {name} = weather;
  document.querySelector("#name").textContent = name;
  var {temp} = weather.main;
  document.querySelector("#temp").textContent = "Temp: " + temp + " °F";
  var {speed} = weather.wind;
  document.querySelector("#wind").textContent = "Wind Speed: " + speed + " MPH";
  var {humidity} = weather.main;
  document.querySelector("#humidity").textContent = "Humidity: " + humidity + "%";


};


