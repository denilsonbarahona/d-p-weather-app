import weather from '../data/current-weather.js';
import { formatDate, formatTemp, } from './utils/format-data.js';
import { weatherConditionsCode, } from './utils/constants.js';
import { getLatLon, } from './geolocation.js';
import { getCurrentWeather, } from './services/weather.js'; 

function setCurrentCity($container, city) {
    $container.textContent = city;
}

function setCurrentDate($container) {
    const date = new Date();
    const formattedDate = formatDate(date);
    $container.textContent =formattedDate;
}

function setCurrentTemp($container, temp){
    $container.textContent = formatTemp(temp);
}

function solarStatus(sunsetTime, sunriseTime){
    const currentHours = new Date().getHours();
    const sunsetHours = sunsetTime.getHours();
    const sunriseHours = sunriseTime.getHours();

    if(currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night';
    }
    return 'morning';
}

function setBackground($container, coditionCode, solarStatus) {
    const weatherType = weatherConditionsCode[coditionCode];
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio:2)').matches ? '@2x' : '';
    $container.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`;
}

function showCurrentWeather($app, $loader) {
    $app.hidden = false;
    $loader.hidden = true;
}

function configCurrentWeather(weather) {
    //loader
    const $app = document.querySelector("#app");
    const $loading = document.querySelector("#loading");
    showCurrentWeather($app, $loading);
    //date
    const $currentWeatherDate = document.querySelector("#current-weather-date");
    setCurrentDate($currentWeatherDate);
    //city
    const $currentWeatherCity = document.querySelector("#current-weather-city");
    const city = weather.name;
    setCurrentCity($currentWeatherCity, city);
    //temp
    const $currentWeatherTemp = document.querySelector("#current-weather-temp");
    const temp = weather.main.temp;
    setCurrentTemp($currentWeatherTemp,temp);
    //background
    const sunriseTime = new Date(weather.sys.sunrise * 100);
    const sunsetTime = new Date(weather.sys.sunset * 100);
    const coditionCode = String(weather.weather[0].id).charAt(0);
    const sunStatus = solarStatus(sunsetTime, sunriseTime)
    setBackground($app, coditionCode, sunStatus);
}


const  currentWeather = async ()=>{
    //GEO //API - Weather //Config
    const {lat, lon, isError, error} = await getLatLon();    
    if(isError) return console.log(error)
    

    const {isError:currentWeartherError, data: weather} = await getCurrentWeather(lat, lon);
    if(currentWeartherError) return console.log("oh! a ocurrido un error trayendo la información del clima");

    configCurrentWeather(weather);
}


export default currentWeather;