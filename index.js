function updateWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let temperature = response.data.temperature.current;
    let conditionElement = document.querySelector("#condition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#date");
    let date = new Date(response.data.time * 1000);

    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;  
    conditionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed} km/h`;
    timeElement.innerHTML = today(date);
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


let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);

searchCity("Johanesburg")