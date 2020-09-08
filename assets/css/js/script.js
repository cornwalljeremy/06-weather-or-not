var todaysDate = moment().format("lll");
var button = $(".btn");
var cityInput = $(".form-control").val();
var iconEl = document.querySelector(".weather-icon");
var weatherEl = document.querySelector("#weather-input")
var tempEl = document.querySelector(".temperature-value p");
var descEl = document.querySelector(".temperature-description p");
var locationEl = document.querySelector(".location p");
var humidityEl = document.querySelector(".humidity");
var windEl = document.querySelector(".wind-speed");
var uvIndexEl = document.querySelector(".uv-index");
// var notificationEl = document.querySelector(".notification");
var key = `963e1a0be2cb2dfab2cc74bc293b5ff4`;
var key2 = `pk.eyJ1IjoiYnNzcGx5cjU1NSIsImEiOiJja2VzejJldzgxa2gwMnJuMXRvMHkyam9pIn0.YEObdce60IP2U6G5ZheuZQ`;

var weather = {};
var KELVIN = 273;

$("#time").text(todaysDate);


// console.log(cityInput)

$(button).on("click", function () {
  cityInput = $(".form-control").val();
  event.preventDefault();
  

  for (var i = 0; i < cityInput.length; i++)
    if (cityInput < i) {
      alert("input a city code please");

      cityInput = $("<p>");
      cityInput.text([i]);
    }

  localStorage.setItem("cities", cityInput);
  getWeather(cityInput);
});


// fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYnNzcGx5cjU1NSIsImEiOiJja2VycGJtanAxendtMzBxbXhvMGF3ZHpnIn0.1riw_U95VX0YO5rapNwgrg`)


function getWeather(cityInput) {
  var api = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${key}`;

  
// 5 day forcast

  fetch(api)
    .then(function (response) {
      var data = response.json();
      return data;
      console.log(data)
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < data.list.length; i += 8) {
       
        var weatherCard = document.createElement("div")
        weatherCard.classList.add("weather-container")
        var fiveDate = document.createElement("p")
        fiveDate.textContent = data.list[0].dt_txt.split(" ")[0]
        var temp = Math.floor(data.list[i].main.temp - KELVIN );
        var mainTemp = document.createElement("p")
        mainTemp.setAttribute("class", "temperature-value")
        mainTemp.textContent = `${temp}°`;
        weatherCard.append(fiveDate, mainTemp)
        weatherEl.append(weatherCard)

        // var descript = data.list[i].weather[0].main;
        // descEl.textContent = `${descript}`;
        // var humidity = data.list[0].main.humidity;
        // humidityEl.textContent = "Humidity " + `${humidity}`;
        // var windSpeed = data.list[0].wind.speed;
        // windEl.textContent = "WindSpeed " + `${windSpeed}` + "kmH";
        var lattitude = data.city.coord.lat;
        var longitude = data.city.coord.lon;

      
      }
      // Day forcast
      var apiOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${key}`
    
    return fetch(apiOneCall)
    })
    
    .then(function (response) {
      var data = response.json();
      return data;
      console.log(data)
    })
    .then(function (result){
      console.log(result)
      // var iconId = data.list[0].weather[0].icon;
      // iconEl.innerHTML = `<img src="icons/${iconId}.png">`;
      
      var temp = Math.floor(result.current.temp - KELVIN );
      weather.temperature.value = temp
      
      tempEl.textContent = `${temp}°`;
      // var descript = data.list[i].weather[0].main;
      // descEl.textContent = `${descript}`;
      // var humidity = data.list[0].main.humidity;
      // humidityEl.textContent = "Humidity " + `${humidity}`;
      // var windSpeed = data.list[0].wind.speed;
      // windEl.textContent = "WindSpeed " + `${windSpeed}` + "kmH";

      
    })
  }

  // var uvIndex = function(){
  //   for(var i = 0; uvIndex > ""; i++);
  //     if(i > uvColor)
  // }



// function displayWeather() {
//   // iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
//   tempEl.innerHTML = `${weather.temperature.value}°<span>C</span>`;
//   descEl.innerHTML = weather.description;
//   locationEl.innerHTML = `${weather.city}`;

// }

weather.temperature = {
  unit: "celsius",
};


function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
  
}

tempEl.addEventListener("click", function(){
  if(tempEl === undefined) return;
  console.log()
  
  if(weather.temperature.unit == "celsius"){
      var fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);
      
      tempEl.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.temperature.unit = "fahrenheit";
  }else{
      tempEl.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = "celsius"
  }
});



//var apiUrl = api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={4c2f8d8f735edeb060159e75322d57d5}
