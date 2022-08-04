
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const TimeZoneOutput = document.querySelector('.tz');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelectorAll('.submit');
const token = 'YOU TOKEN';

let cityInput = "Huelva";

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        Swal.fire({
            position: 'bottom-left',
            width: '25em',
            text: 'Type the name of a city',
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true
        })
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
    }
    e.preventDefault();
});

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${token}&q=${cityInput}
    `)

        .then(response => response.json())
        .then(data => {
            console.log(data)

            temp.innerHTML = Math.floor(data.current.temp_c) + "ºC";
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const time = date.substr(11);

            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);
            icon.src = "./assets/img/weather" + iconId;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + " km/h";
            TimeZoneOutput.innerHTML = data.location.tz_id;
        });
}

fetchWeatherData();