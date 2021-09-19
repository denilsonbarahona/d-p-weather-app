const config_ = {
    day: "numeric",
    weekday: 'long',
    month: 'long',
}

export function formatDate(date, config=config_) {
    return new Intl.DateTimeFormat('es', config).format(date)
}

export function formatTemp(value) {
    return `${Math.floor(value)}°`
}

export function formatSpeed(value) {
    return `${Math.floor(value)} km-h`;
}

export function formatWeekList(rawData) {
    const weekList = []

    while(rawData.length >0){
        weekList.push(rawData.splice(0,8))
    }



    return weekList
}