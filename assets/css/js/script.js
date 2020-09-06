var todaysDate = moment().format("lll");
var button = $(".btn");
var cityInput = $(".form-control").val();
var tempElement = document.querySelector(".temperature-value p");
var descElement = document.querySelector(".temperature-description p");
var locationElement = document.querySelector(".location p");
var humidityEl = document.querySelector(".humidity");
var windEl = document.querySelector(".wind-speed");
var uvIndexEl = document.querySelector(".uv-index");
var notificationElement = document.querySelector(".notification");
var key = `963e1a0be2cb2dfab2cc74bc293b5ff4`;
var key2 = `pk.eyJ1IjoiYnNzcGx5cjU1NSIsImEiOiJja2VycGJtanAxendtMzBxbXhvMGF3ZHpnIn0.1riw_U95VX0YO5rapNwgrg`;

var weather = [];
var KELVIN = 273;

$("#time").text(todaysDate);

weather.temperature = {
  unit: "celsius",
};
// console.log(cityInput)

$(button).on("click", function () {
  cityInput = $(".form-control").val();
  event.preventDefault();

  for (var i = 0; i < cityInput.length; i++)
    if (cityInput < i) {
      alert("input a zip code please");

      cityInput = $("<p>");
      cityInput.text([i]);
    }

  localStorage.setItem("cities", cityInput);
  getWeather(cityInput);
});


// fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYnNzcGx5cjU1NSIsImEiOiJja2VycGJtanAxendtMzBxbXhvMGF3ZHpnIn0.1riw_U95VX0YO5rapNwgrg`)


function getWeather(cityInput) {
  // var api = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${key}`;

  var api = `https://api.openweathermap.org/data/2.5/onecall?q=${cityInput}&appid=${key}`

  fetch(api)
    .then(function (response) {
      var data = response.json();
      return data;
      console.log(data)
    })
    .then(function (data) {
      console.log(data)
      for (var i = 0; i < data.list.length; i += 8) {
        //make temp show
        var temp = Math.floor(data.list[i].main.temp - KELVIN);
        tempElement.textContent = `${temp}°`;
        var descript = data.list[i].weather[0].main;
        descElement.textContent = `${descript}`;
        var humidity = data.list[0].main.humidity;
        humidityEl.textContent = "Humidity " + `${humidity}`;
        var windSpeed = data.list[0].wind.speed;
        windEl.textContent = "WindSpeed " + `${windSpeed}` + "kmH";
        var lattitude = data.city.coord.lat;
        var longitude = data.city.coord.lon;
      }
    })
  }      

// function displayWeather() {
//   // iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
//   tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
//   descElement.innerHTML = weather.description;
//   locationElement.innerHTML = `${weather.city}`;

// }
// function setIcons(icon, iconId){
//     var skycons = new skycons({color: "white"});
//     var currentIcon =
// }

function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

tempElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});

//var apiUrl = api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={4c2f8d8f735edeb060159e75322d57d5}
