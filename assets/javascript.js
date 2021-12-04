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

//display current weather for searched city
var currentWeather = function(city) {
  console.log(city);
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      displayWeather(data, city);
      foreCast(data.coord.lat, data.coord.lon);
    
      
    });

  });

//saving searched city to local storage
var citySearch = JSON.parse(localStorage.getItem("search"));
  if (citySearch && citySearch.includes(city) === false){
    citySearch.push(city);
    createButton(city);
  } else if (!citySearch)
    {citySearch = [city];  createButton(city);}
 localStorage.setItem("search", JSON.stringify(citySearch));



}

function updateHistory() {


var citySearch = JSON.parse(localStorage.getItem("search"));


    for (var i = 0; citySearch.length > i; i++){
      createButton(citySearch[i])
      };
};

//dynamically creating a "a" element to be clicked on and ran through the functions
function createButton(cityName) {
  var searchedCities = document.getElementById("searched-cities");
  var searchButtons = document.createElement("a");
 
  searchButtons.textContent = cityName;
  searchButtons.setAttribute("class", "recentButton");
  searchButtons.setAttribute("data-city", cityName);
  searchedCities.append(searchButtons);

  searchButtons.addEventListener("click", function(){
    currentWeather(cityName)
  });

}


//displaying current weather
var displayWeather = function(weather) {
  var {name} = weather;
  document.querySelector("#name").textContent = name;
  var {temp} = weather.main;
 
  var todayDate = moment().format('MMMM DD YYYY');
  document.querySelector(".today-date").textContent = todayDate;

  var imageIcon = weather.weather[0].icon;
  var clearImage = document.getElementById("current-img");
  clearImage.innerHTML = '';

  var displayImage = document.createElement("img");
  displayImage.setAttribute("src", "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png");
  document.querySelector(".current-img").appendChild(displayImage);

  document.querySelector("#temp").textContent = "Temp: " + temp + " °F";
  var {speed} = weather.wind;
  document.querySelector("#wind").textContent = "Wind Speed: " + speed + " MPH";

  var {humidity} = weather.main;
  document.querySelector("#humidity").textContent = "Humidity: " + humidity + "%";
};

//displaying UVI 
function UVI (uv) {
  document.querySelector("#uv").innerHTML = "UVI: <span id='uvSpan'> " + uv + "</span>";
    if (uv <= 2.99) {
      document.querySelector("#uvSpan").setAttribute("class", "bg-success");
    }
    if (uv >=3 && uv <=6) {
      document.querySelector("#uvSpan").setAttribute("class", "bg-warning");
    }
    if (uv >=6.01 && uv <=12) {
      document.querySelector("#uvSpan").setAttribute("class", "bg-danger");
    }

}


//displaying five day forecast
var foreCast = function(lat, lon){

  var clearSearch = document.getElementById("cardContainer");
  clearSearch.innerHTML = '';

  //calling the API for a second time  through lat & lon to get the forecast
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=" + apiKey;
  fetch(apiUrl).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);

    for (i = 0; i < 5; i++){
     
      var cardContainer = document.createElement("div");
      var cardBody = document.createElement("div");
      cardBody.setAttribute("class", "bg-dark p-3 border");

      var cityDate = document.createElement("div");
      cityDate.textContent = moment().add((i+ 1), 'day').format("MMM DD YYYY");
     
  
      var weatherImage = document.createElement("img");
      var iconNumber = data.daily[i].weather[0].icon;
      weatherImage.setAttribute("src", "http://openweathermap.org/img/wn/" +iconNumber + "@2x.png");
   
     
      var tempElement = document.createElement("div");
      tempElement.textContent = "Temp: " + data.daily[i].temp.day + "°F"
      

      var windSpeed = document.createElement("div");
      windSpeed.textContent = "Wind Speed: " + data.daily[i].wind_speed + "MPH";
  

      var humidityF = document.createElement("div");
      humidityF.textContent = "Humidity: " + data.daily[i].humidity + "%";
    
      var fiveDay = document.getElementById("fiveDay");
      fiveDay.innerText = "Five Day Forecast:";

      fiveDay.appendChild(cardBody);
      cardBody.append(cityDate, weatherImage, tempElement, windSpeed, humidityF);
      cardContainer.append(cardBody);
      document.querySelector(".cardContainer").append(cardContainer);


    }
    //getting the current UVI through this API call
    UVI(data.current.uvi);
  })

}

updateHistory();


