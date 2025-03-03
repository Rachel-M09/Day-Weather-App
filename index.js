function searchWeather(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar");

    let h2 = document.querySelector("#city");
    h2.innerHTML = `${searchInput.value}`

}


let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);