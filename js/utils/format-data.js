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