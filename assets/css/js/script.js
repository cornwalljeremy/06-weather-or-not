var todaysDate = moment().format("lll");
var button = $(".btn");
var zipInput = $(".form-control").val;
var tempElement = document.querySelector(".temperature-value p");
var descElement = document.querySelector(".temperature-description p");
var locationElement = document.querySelector(".location p");
var notificationElement = document.querySelector(".notification");
var key = "4c2f8d8f735edeb060159e75322d57d5";
var weather = {};
var KELVIN = 273;
var searchZip = $("zipInput").val;

$("#time").text(todaysDate);

weather.temperature = {
  unit: "celsius",
};
// console.log(zipInput)

$(button).on("click", function () {
  zipInput = $(".form-control").val();
  event.preventDefault();

  for (var i = 0; i < zipInput.length; i++)
    if (zipInput < i) {
      alert("input a zip code please");

      zipInput = $("<p>");
      zipInput.text([i]);
    }

  localStorage.setItem("", zipInput);
});

function getWeather() {
  var proxy = "https://cors-anywhere.herokuapp.com/";
  var api = `${proxy}https://api.openweathermap.org/data/2.5/weather?zip="  + zipInput + "appid="4c2f8d8f735edeb060159e75322d57d5"`;

  fetch(api)
    .then(function (response) {
      var data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
    // iconElement.innerHTML = `<img src="/${weather.iconId}/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}`;

}
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

getWeather();
//var apiUrl = api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={4c2f8d8f735edeb060159e75322d57d5}
