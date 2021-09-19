import currentWeather from './current-weather.js';
import weeklyWeather from './weekly-forecast.js';
import {ViewportSize} from './utils/viewport.js';
import './tabs.js';

const $app = document.querySelector("#app");
const $loading = document.querySelector("#loading");

ViewportSize($app);
ViewportSize($loading);

weeklyWeather();
currentWeather();