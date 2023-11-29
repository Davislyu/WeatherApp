export function convertCelToFer(celTemp) {
    return (celTemp * 9) / 5 + 32
}

export function convertFerToCel(celTemp) {
    return ((celTemp - 32) * 5) / 9
}