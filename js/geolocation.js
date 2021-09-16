function geolocationSupport(){
    return "geolocation" in navigator; 
}

const defaultOptions = {
    enableHighAccuracy: true, 
    timeout:5000,
    maximumAge:100000,
};

export function getCurrentPosition(options = defaultOptions) {
    if(!geolocationSupport()) throw new Error("No hay soporte de geolocalización en el navegador");

    return new Promise((resolve, reject)=>{
        
        navigator.geolocation.getCurrentPosition((position)=>{                 
            
            resolve( position);
        },()=>{
            reject("No hemos podido obtener tu ubicación");
        },options)
    })
}

export async function getLatLon(options = defaultOptions) {
   try {
       const {coords: {latitude: lat, longitude: lon}} = await getCurrentPosition(options);
       return {lat, lon, isError:false, error: null};
   }
   catch {
    return {lat:null, lon:null, isError:true, error: "Ah ocurrido un error ubicandote"};
   }
}