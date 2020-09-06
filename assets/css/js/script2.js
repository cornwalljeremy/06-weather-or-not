var todaysDate = moment().format("lll");
var button = $(".btn");
var zipInput = $(".form-control").val;
// var descElement = document.querySelector(".temperature-description p");
// var locationElement = document.querySelector(".location p");
// var notificationElement = document.querySelector(".notification");
// var key = "4c2f8d8f735edeb060159e75322d57d5";
// var weather = {};
// var KELVIN =  273;

$("#time").text(todaysDate);

// weather.temperature = {
//     unit: "celsius"
// }
// console.log(zipInput)

$(button).on("click", function () {
    zipInput = $(".form-control").val();
    event.preventDefault();
    
    
//     for (var i = 0; i < zipInput.length; i++)
// if(zipInput < i){
//     alert("input a zip code please")
    
//     // zipInput = $('<p>');
//     // zipInput.text([i]);
// }
var searchZip = $("zipInput").val
localStorage.setItem("", zipInput);
  });

//   function getWeather(zipInput){
//     var api = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipInput + &appid="4c2f8d8f735edeb060159e75322d57d5"
    
//     fetch(api)
//         .then(function(response){
//             let data = response.json();
//             return data;
//         })
//         .then(function(data){
//             weather.temperature.value = Math.floor(data.main.temp - KELVIN);
//             weather.description = data.weather[0].description;
//             weather.iconId = data.weather[0].icon;
//             weather.city = data.name;
//             weather.country = data.sys.country;
//         })
//         .then(function(){
//             displayWeather();
//         });
// }

// function displayWeather(){
//     iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
//     tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
//     descElement.innerHTML = weather.description;
//     locationElement.innerHTML = `${weather.city}`;
// }

// function celsiusToFahrenheit(temperature){
//     return (temperature * 9/5) + 32;
// }


//var apiUrl = api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={4c2f8d8f735edeb060159e75322d57d5}