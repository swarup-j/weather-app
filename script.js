import {updateForecast} from './forecast.js';

const searchButton = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search');
const cityName = document.querySelector('.js-city-name');
const temperature = document.querySelector('.js-temperature');
const humidity = document.querySelector('.js-humidity-percent');
const wind = document.querySelector('.js-wind-speed');
const feel = document.querySelector('.js-real-feel-temp');
const pressure = document.querySelector('.js-pressure-hPa');
const icon = document.querySelector('.js-icon');

const lastSearchedCity =  "Pune";
if(lastSearchedCity){
    searchInput.value = lastSearchedCity;
    updateWeather();
    updateForecast();
}

document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        updateWeather();
        updateForecast();
    }
});

searchButton.addEventListener('click', () =>{
    updateWeather();
    updateForecast();
});

async function updateWeather() {
    const city = searchInput.value;

    if(city){
        try{
            localStorage.setItem('lastSearchedCity', city);

            const data = await getWeather(city);
            // console.log(data);

            cityName.innerHTML = data.name;
            temperature.innerHTML = `${Math.round(data.main.temp)}&degC`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${(data.wind.speed).toFixed(1)} km/h`;
            feel.innerHTML = `${Math.round(data.main.feels_like)}&degC`;
            pressure.innerHTML = `${data.main.pressure} hPa`;

            icon.src = iconImage(data);
            
            searchInput.value = '';
        } catch(error){
            console.error("Error fetching weather data:", error);

            cityName.innerHTML = 'City not found';
            temperature.innerHTML = ``;
            humidity.innerHTML = '';
            wind.innerHTML = ``;
            icon.src = ``;
            searchInput.value = '';
        }
    }
}

async function getWeather(city){
    const apiKey = "807b0a1f0c5726475a4225e8eb35a177";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json();
    return data;
}

export function iconImage(data){
    if(data.weather[0].main === 'Clouds'){
        return 'images/clouds.png';
    }
    else if(data.weather[0].main === 'Clear'){
        return 'images/clear.png';
    }
    else if(data.weather[0].main === 'Drizzle'){
        return 'images/drizzle.png';
    }
    else if(data.weather[0].main === 'Mist'){
        return 'images/mist.png';
    }
    else if(data.weather[0].main === 'Rain'){
        return 'images/rain.png';
    }
    else if(data.weather[0].main === 'Snow'){
        return 'images/snow.png';
    }
    else if(data.weather[0].main === 'Thunderstorm'){
        return 'images/thunderstorm.png';
    }
    else if(data.weather[0].main === 'Haze'){
        return 'images/haze.png';
    }
    else if(data.weather[0].main === 'Fog' || 'Smoke' || 'Dust' || 'Sand' || 'Ash' || 'Squall' || 'Tornado'){
        return 'images/fog.png';
    }
}
