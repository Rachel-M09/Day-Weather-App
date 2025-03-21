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
   
    pullForecast(response.data.city);
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

function pullForecast(city){
  let apiKey = "abatc7e4c535e39o4038301f01bf3de5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(forecast);
}

function dayFormat(timestamp){
  let date = new Date (timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function forecast(response) {
  
  let forecastAdd = "";

  response.data.daily.forEach(function (day, index) {

    if(index < 5)  {
    forecastAdd =
      forecastAdd +
      `
      <div id="weather-forecast-container">
      <div id="weather-forecast">
        <div id="forecast-day">${dayFormat(day.time)}</div>
        <img src="${day.condition.icon_url}" id="forecast-icon"/>
        <div id="forecast-temperatures">
          <div id="forecast-temperature">${Math.round(day.temperature.maximum)}°</div>
          <div id="forecast-temp">${Math.round(day.temperature.minimum)}°</div>
        </div>
      </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast-container");
  forecastElement.innerHTML = forecastAdd;
}


let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);

searchCity("Johannesburg");

