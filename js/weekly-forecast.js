import {getWeeklytForecast} from './services/weather.js';
import {formatWeekList } from './utils/format-data.js';
import {getLatLon} from './geolocation.js';
import {createDOM} from './utils/dom.js';
import { createPeriodTime, handledAppendExtra, } from './utils/period-time.js';
import draggable from './utils/draggable.js';

/* */

function tabPanelTemplate(id){    
    return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
        <div class="dayWeather" id="dayWeather-${id}">
            <ul class="dayWeather-list" id="dayWeather-list-${id}"></ul>        
        </div>       
    </div>`;
}

function createTabPanel(id, extras) {    
    const $panel = createDOM(tabPanelTemplate(id, extras));
    if(id > 0) {
        $panel.hidden = true;
    }
    return $panel;
}

function configWeeklyWeather(forecast){
    const $container = document.querySelector(".tabs");

    forecast.forEach((day, index)=>{     
        const $panel = createTabPanel(index);
        $container.append($panel)
        day.forEach((weather,indexDay)=>{
            $panel.querySelector(".dayWeather-list").append(createPeriodTime(weather, {index,indexDay} ));
            $panel.querySelector(".dayWeather").append(handledAppendExtra({...weather.main, ...weather.wind}, {index,indexDay}));
        })
    })
}

export default async function weeklyWeather(){
    //GEO //API - Forecast //Config
    const $draggable = document.querySelector(".weeklyWeather");
    const {lat, lon, isError, error} = await getLatLon();    
    if(isError) return console.log(error)
    

    const {isError:weeklyWeartherError, data: forecast} = await getWeeklytForecast(lat, lon);
    if(weeklyWeartherError) return console.log("oh! a ocurrido un error trayendo la predicción del clima");
    
    const weeklistForecast = formatWeekList(forecast.list);    
    configWeeklyWeather(weeklistForecast);
    draggable($draggable);
}



