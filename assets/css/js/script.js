var todaysDate = moment().format("lll");
var backColor = document.querySelector("body");
var button = $(".btn");
var cityInput = $(".form-control").val();
var iconEl = document.querySelector(".weather-icon");
var weatherEl = document.querySelector("#weather-input");
var tempEl = document.querySelector(".temperature-value p");
var descEl = document.querySelector(".temperature-description p");
var locationEl = document.querySelector(".location p");
var humidityEl = document.querySelector(".humidity");
var windEl = document.querySelector(".wind-speed");
var uvIndexEl = document.querySelector(".uv-index");
var list = JSON.parse(localStorage.getItem("cities")) || [];

var key = `963e1a0be2cb2dfab2cc74bc293b5ff4`;

var weather = {};
var KELVIN = 273;

$("#time").text(todaysDate);

console.log(list);

$(button).on("click", function (event) {
  event.preventDefault();
  $("#weather-input").empty();
  cityInput = $(".form-control").val();
  $("form-control").empty();
  console.log(cityInput);

  if (cityInput === "") {
    alert("input a city please");
  } else {
    list.push(cityInput);
    localStorage.setItem("cities", JSON.stringify(list));

    getWeather(cityInput);
  }
});

$(document).ready(function () {
  for (var i = 0; i < list.length; i++) {
    // console.log(list[i]);
    var test = $("<button/>", {
      text: list[i],
      value: list[i],
      click: function () {
        $("#weather-input").empty();
        getWeather(this.value);
      },
      
    });
    
    $(".recent-search").append(test);
  }
});

function getWeather(cityInput) {
  var api = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${key}`;

  // 5 day forcast

  fetch(api)
    .then(function (response) {
      var data = response.json();
      return data;
      console.log(data);
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.list.length; i += 8) {
        $(".large-name").text(data.city.name);
        var weatherCard = document.createElement("div");
        weatherCard.classList.add("weather-container");

        var fiveDate = document.createElement("p");
        fiveDate.textContent = data.list[i].dt_txt.split(" ")[0];

        var temp = Math.floor(data.list[i].main.temp - KELVIN);
        var mainTemp = document.createElement("p");
        mainTemp.setAttribute("class", "temperature-value");
        mainTemp.textContent = `${temp}°C`;

        var descript = data.list[i].weather[0].main;
        var mainDescript = document.createElement("p");
        mainDescript.setAttribute("class", "temperature-description");
        mainDescript.textContent = `${descript}`;

        var humidity = data.list[i].main.humidity;
        var mainHumidity = document.createElement("p");
        mainHumidity.setAttribute("class", "humidity");
        mainHumidity.textContent = "Humidity " + `${humidity}`;

        weatherCard.append(fiveDate, mainTemp, mainDescript, mainHumidity);
        weatherEl.append(weatherCard);
        // console.log(weatherCard);

        // var windSpeed = data.list[0].wind.speed;
        // windEl.textContent = "WindSpeed " + `${windSpeed}` + "kmH";
        var lattitude = data.city.coord.lat;
        var longitude = data.city.coord.lon;
      }
      // Day forcast
      var apiOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${key}`;

      return fetch(apiOneCall);
    })

    .then(function (response) {
      var data = response.json();
      return data;
      console.log(data);
    })
    .then(function (result) {
      console.log(result);

      var iconId = result.current.weather[0].icon;
      iconEl.innerHTML = `<img src="icons/${iconId}.png">`;

      var temp = Math.floor(result.current.temp - KELVIN);
      weather.temperature.value = temp;
      tempEl.textContent = `${temp}°`;

      var descript = result.current.weather[0].description;
      descEl.textContent = `${descript}`;

      var humidity = result.current.humidity;
      humidityEl.textContent = "Humidity " + `${humidity}`;

      var windSpeed = result.current.wind_speed;
      windEl.textContent = "WindSpeed " + `${windSpeed}` + "kmH";

      var uvInfo = result.current.uvi;
      uvIndexEl.textContent = "UV Index " + `${uvInfo}`;
      if (uvInfo <= 2) {
        backColor.style.backgroundColor = "green";
      } else if (uvInfo <= 5) {
        backColor.style.backgroundColor = "yellow";
      } else if (uvInfo <= 7) {
        backColor.style.backgroundColor = "orange";
      } else if (uvInfo <= 10) {
        backColor.style.backgroundColor = "red";
      } else if (uvInfo >= 11) {
        backColor.style.backgroundColor = "purple";
      }
    });
}

weather.temperature = {
  unit: "celsius",
};

function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

tempEl.addEventListener("click", function () {
  if (tempEl === undefined) return;
  console.log();

  if (weather.temperature.unit == "celsius") {
    var fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempEl.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempEl.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});

//var apiUrl = api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={4c2f8d8f735edeb060159e75322d57d5}
