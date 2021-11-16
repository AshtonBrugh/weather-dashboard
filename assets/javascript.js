var response = fetch("https://api.openweathermap.org/data/2.5/weather?q=Raleigh&appid=a9792d86ad12efe56b0f259d2b28f7cc")
  .then(function(response){
    response.json().then(function(data){
      console.log(data);
    })
  })