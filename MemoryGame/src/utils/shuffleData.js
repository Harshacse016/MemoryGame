import { chars, maxNumberOfCards } from "./constants"

function randomNumber(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low
}

function generateNumbers(start, end) {
    let arr = []
    for (let i = start; i < end; i++) {
        arr.push(i)
    }
    return arr
}

export const ShuffleData = () => {
    let numbers = generateNumbers(0, maxNumberOfCards)
    let shuffleData = []

    for (let i = 0; i < maxNumberOfCards; i++) {
        let randomInd = randomNumber(0, numbers.length - 1)
        let randomNum = numbers[randomInd]
        numbers.splice(randomInd, 1)
        shuffleData.push({
            id: i,
            name: chars[randomNum],
            visible: false,
        })
    }

    return shuffleData
}