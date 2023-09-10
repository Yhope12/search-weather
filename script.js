function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let celciusTemperature=null;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#icon-object").setAttribute("src",response.data.condition.icon_url);
  document.querySelector("#icon-object").setAttribute("alt",response.data.condition.icon);
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
    // celciusTemperature=response.data.temperature.current;
  );

  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
}

function searchCity(city) {
  let apiKey = "e4ada4d5033f1bdt8o356e4c1f68a52f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

// function searchLocation(position) {
//   let apiKey = "e4ada4d5033f1bdt8o356e4c1f68a52f";
// let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.data.coordinates.longitude}&lat=${position.data.coordinates.latitude}&key=${apiKey}&units=metric`;

//   axios.get(apiUrl).then(displayWeatherCondition);
// }

// function getCurrentLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(searchLocation);
// }

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature=((celciusTemperature*9)/5+32);
  fahrenheit.classList.add("active");
  celcius.classList.remove("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// let currentLocationButton = document.querySelector("#current-location-button");
// currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheit=document.getElementById("fahrenheit");
fahrenheit.addEventListener("click",convertToFahrenheit);

let celcius=document.getElementById("celcius");
celcius.addEventListener("click",convertToCelsius);

searchCity("New York");
