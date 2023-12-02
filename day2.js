const fs = require("fs")
input = fs.readFileSync('./inputs/day2.txt',"utf-8").split(/\n/)
const gameList = input.map( (x) =>  x.split(': ')[1].split('; '))

function convertBagsIntoObject(games) {
    const result = []

    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        let newGame = []

        for (let j = 0; j < game.length; j++) {

            let bag = {red: 0, green: 0, blue: 0}
            let currentGame = game[j].split(', ')

            bag[currentGame[0].split(' ')[1]] = +currentGame[0].split(' ')[0]
            if (currentGame[1]) {
                bag[currentGame[1].split(' ')[1]] = +currentGame[1].split(' ')[0]
            }
            if (currentGame[2]) {
                bag[currentGame[2].split(' ')[1]] = +currentGame[2].split(' ')[0]
            }
            
            newGame.push(bag)
        }

        result.push(newGame)
    }

    return result
}

const convertedGameList = convertBagsIntoObject(gameList)

// Question 1
// Determine which games would have been possible 
// if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. 
// What is the sum of the IDs of those games?
function checkIfPossible(game) {
    let gamePossible = true

    for (let bag of game) {

        if (bag.red > 12 || bag.green > 13 || bag.blue > 14) {
            gamePossible = false
        }
    }

    return gamePossible 
}

let sumOfIds = 0

for (let i = 0; i < convertedGameList.length; i++) {
    if(checkIfPossible(convertedGameList[i])){
        sumOfIds += (i + 1)
    }
}

console.log("Question 1 answer: " + sumOfIds);

/// part 2 

function getMinimumPower(game) {
    let maxRed = 0
    let maxGreen = 0
    let maxBlue = 0

    for (let bag of game) {

        if(bag.red > maxRed) maxRed = bag.red
        if(bag.green > maxGreen) maxGreen = bag.green
        if(bag.blue > maxBlue) maxBlue = bag.blue
    }

    return maxRed * maxGreen * maxBlue
}

//sum of games
let sunOfGames = 0

for (let i = 0; i < convertedGameList.length; i++) {
    sunOfGames += getMinimumPower(convertedGameList[i])
}

console.log("Question 2 answer: " + sunOfGames)