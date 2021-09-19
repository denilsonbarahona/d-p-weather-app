import {API_KEY, BASE_API} from '../utils/constants.js';

async function weatherAPIResponse (response) {
    if(!response.ok) return {
        isError: true, 
        data: null,
    };
 
    const data = await response.json();
    return {
        isError:false,
        data,
    }
}

export const getCurrentWeather = async(lat, lon)=>{
   const response = await fetch(`${BASE_API}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
   return weatherAPIResponse(response);
}


export const getWeeklytForecast = async(lat, lon)=>{
    const response = await fetch(`${BASE_API}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    return weatherAPIResponse(response);
 }
 