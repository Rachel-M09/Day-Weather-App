function updateWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let temperature = response.data.temperature.current;
    let conditionElement = document.querySelector("#condition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#date");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;  
    conditionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed} km/h`;
    timeElement.innerHTML = today(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`
   
}

function today(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
    apiKey ="abatc7e4c535e39o4038301f01bf3de5";
    apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(updateWeather);
}

function searchWeather(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar");

    searchCity(searchInput.value);
}

function forecast() {
  let days = ["Wed", "Tue", "Thu", "Fri", "Sat"];
  let forecastAdd = "";

  days.forEach(function (day) {
    forecastAdd =
      forecastAdd +
      `
      <dic id="weather-forecast-container">
      <div id="weather-forecast">
        <div id="forecast-day">${day}</div>
        <div id="forecast-icon">☀️</div>
        <div id="forecast-temperatures">
          <div id="forecast-temperature">24°C</div>
          <div id="forecast-temp">19°C</div>
        </div>
      </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#weather-forecast-container");
  forecastElement.innerHTML = forecastAdd;
}


let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);

searchCity("Johannesburg");
forecast();
