var userFormEl = document.querySelector("#user-form");
var userCity = document.querySelector("#city");


var formSubmitHandler = function(event) {
  event.preventDefault();

//get the value from the input element
var cityInput = userCity.value.trim();

if(cityInput) {
  userInput(cityInput);
  userCity.value = "";
} else {
  alert("Please enter a city!")
}

};

userFormEl.addEventListener("submit", formSubmitHandler);



var userInput = function(user) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + user + "&appid=a9792d86ad12efe56b0f259d2b28f7cc";

  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};

