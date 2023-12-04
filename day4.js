const fs = require("fs")

//readfile syncronos
let input = fs.readFileSync('./inputs/day4.txt',"utf-8").split(/\n/)

let testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split('\n')


function convertInput(input) {
    const setArray = []

    for (let i = 0; i < input.length; i++) {
        let card1 =  new Set(input[i].split(': ')[1].split('| ')[0].split(' '));
        card1.delete('')
        let card2 =  new Set(input[i].split(': ')[1].split('| ')[1].split(' '));
        card2.delete('')
    
        setArray.push({'cardId': i+1, 'winNums' : card1, 'yourNums' :card2, 'copies': 1})
    }

    return setArray
}


function getPoints(cardsArray) {
    let totalPoints = 0

    for (let i = 0; i < cardsArray.length; i++) {
        let currentCardPoints = 0

        cardsArray[i].yourNums.forEach(element => {
            if (cardsArray[i].winNums.has(element)) {
                currentCardPoints == 0 ? currentCardPoints++ : currentCardPoints *= 2
            }
        });

        totalPoints+=currentCardPoints
    }

    return totalPoints
}

function getCopies(cardsArray) {
    let totalCopies = 0

    for (let i = 0; i < cardsArray.length; i++) {

        for (let k = 0; k < cardsArray[i].copies; k++) {

            let numOfCopies = 0

            cardsArray[i].yourNums.forEach(element => {
                if (cardsArray[i].winNums.has(element)) {
                    numOfCopies++
                }
            });

            for (let j = 1; j < numOfCopies + 1; j++) {
                cardsArray[i+j].copies = cardsArray[i+j].copies + 1
            }


        }

        totalCopies+= cardsArray[i].copies
    }

    return totalCopies
}


// Question one Test
console.log("Test question one");
const convertedTest = convertInput(testInput)
console.log(getPoints(convertedTest))


// Question one
console.log("Question One");
const converted = convertInput(input)
console.log(getPoints(converted))


//question two test
console.log('Test Question TWO');
console.log(getCopies(convertedTest))

//question two test
console.log('Question TWO');
console.log(getCopies(converted))
