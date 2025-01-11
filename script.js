const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

async function checkWeather(city) {
    const api_key = "cacacbdf358db3a0ca9caf00f9791e9f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weather_data = await response.json();

        temperature.innerHTML = `${(weather_data.main.temp - 273.15).toFixed(2)} °C`; 
        description.innerHTML = weather_data.weather[0].description;
        humidity.innerHTML = `Humidity: ${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `Wind Speed: ${weather_data.wind.speed} m/s`;

        const weatherCondition = weather_data.weather[0].main.toLowerCase();
        if (weatherCondition.includes('cloud')) {
            weather_img.src = 'cloudy.png'; 
        } else if (weatherCondition.includes('rain')) {
            weather_img.src = 'rainy.png'; 
        } else {
            weather_img.src = 'clear.png'; 
        }
    } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data. Please check the city name.');
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
