import {API_KEY, BASE_API} from '../utils/constants.js';

export const getCurrentWeather = async(lat, lon)=>{
   const response = await fetch(`${BASE_API}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
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