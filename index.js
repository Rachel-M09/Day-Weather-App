function updateWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let temperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city
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