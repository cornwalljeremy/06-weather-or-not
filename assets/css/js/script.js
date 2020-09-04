var button = $(".btn");
var zipInput = $(".form-control").val;
var todaysDate = moment().format("LL");



$("#time").text(todaysDate);
console.log(todaysDate)

//var apiUrl = api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={4c2f8d8f735edeb060159e75322d57d5}