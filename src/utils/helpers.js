export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}


export function formatDate(timestamp) {
    const newDate = new Date(timestamp)
    return newDate.toUTCString()
}