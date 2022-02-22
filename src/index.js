let nowDate = new Date();

let currentDate = document.querySelector("#current-day");
let currentTime = document.querySelector("#current-time");

let hours = nowDate.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = nowDate.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturdays",
];
let day = days[nowDate.getDay()];

currentDate.innerHTML = `${day}`;
currentTime.innerHTML = `${hours}:${minutes}`;

let formSubmit = document.querySelector("#search-form");
formSubmit.addEventListener("submit", handleSubmit);

function showWeatherCondition(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = `${temperature}°C`;

  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "b8b6ab4678e1955295744894b03eedec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-text");

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${searchInput.value}`;

  if (searchInput.value) {
    h3.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  } else {
    h3.innerHTML = null;
    alert("Please type a city");
  }

  searchCity(city);
}

searchCity("Manchester");

function showPosition(position) {
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "40bdcea898f4d64cd586d363cd0cb380";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherCondition);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentlLocationButton = document.querySelector("#current-location-button");
currentlLocationButton.addEventListener("click", getCurrentPosition);
