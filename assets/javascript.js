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
      foreCast(data.coord.lat, data.coord.lon);
      
    });

  });
};


; 
var displayWeather = function(weather) {
  console.log(weather);
  var {name} = weather;
  document.querySelector("#name").textContent = name;
  var {temp} = weather.main;

  var todayDate = moment().format('MMM DD,YYYY');
  console.log(todayDate);
  document.querySelector(".today-date").textContent = todayDate;

  var imageIcon = weather.weather[0].icon;
  console.log(imageIcon);
  var displayImage = document.createElement("img");
  displayImage.setAttribute("src", "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png");
  document.querySelector(".current-img").appendChild(displayImage);

  document.querySelector("#temp").textContent = "Temp: " + temp + " °F";
  var {speed} = weather.wind;
  document.querySelector("#wind").textContent = "Wind Speed: " + speed + " MPH";

  var {humidity} = weather.main;
  document.querySelector("#humidity").textContent = "Humidity: " + humidity + "%";
};

var foreCast = function(lat, lon){
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=" + apiKey;
  fetch(apiUrl).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data)
   
    for (i = 0; i < 5; i++){

      var forecastDate = moment().add([i] + 86400, 'seconds').format('MMM DD,YYYY');
      console.log(forecastDate);

      var weatherImage = document.createElement("img");
      var iconNumber = data.daily[i].weather[0].icon;
      weatherImage.setAttribute("src", "http://openweathermap.org/img/wn/" +iconNumber + "@2x.png");
      document.querySelector(".container-forecast").appendChild(weatherImage);
     
      var tempElement = document.createElement("div");
      tempElement.textContent = "Temp: " + data.daily[i].temp.day
      document.querySelector(".container-forecast").appendChild(tempElement);

      var windSpeed = document.createElement("div");
      windSpeed.textContent = "Wind Speed: " + data.daily[i].wind_speed;
      document.querySelector(".container-forecast").appendChild(windSpeed);

      var humidityF = document.createElement("div");
      humidityF.textContent = "Humidity: " + data.daily[i].humidity;
      document.querySelector(".container-forecast").appendChild(humidityF);
    }
  })
}



