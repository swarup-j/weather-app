import {iconImage} from './script.js';

const searchInput = document.querySelector('.js-search');

export async function updateForecast(){
    const city = searchInput.value;

    if(city){
        try{
            const data = await getForecast(city);
            console.log(data);

            let forecastData = '';

            for(let i=0 ; i< 40 ; i=i+8){
                const dayData = data.list[i];
                //* 1000 because to convert it in millisecond
                const date = new Date(dayData.dt * 1000);
                let day;
                
                if(i === 0){
                    day = 'Today';
                }
                else{
                    day = date.toLocaleDateString('en-US', { weekday: 'short' });
                }
                
                const temperature = Math.round(dayData.main.temp);
                const icon = iconImage(dayData);

                forecastData += `
                    <div>
                        <p class="forecast-day">${day}</p>
                        <img src="${icon}" class="forecast-icon js-forecast-icon">
                        <p class="forecast-temperature">${temperature}&degC</p>
                    </div>
                `;
            }

            document.querySelector('.js-forecast-info').innerHTML = forecastData;
        }catch(error){
            console.error('Error fetching weather data:', error);
        }
    }
}

async function getForecast(city){
    const apiKey = "807b0a1f0c5726475a4225e8eb35a177";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json();
    return data;
}