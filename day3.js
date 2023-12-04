const fs = require("fs")

//readfile syncronos
input = fs.readFileSync('./inputs/day3.txt',"utf-8").split(/\n/)


// test input

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.split(/\n/)

const notSymbolsSet = new Set(['0','1','2','3','4','5','6','7','8','9','.'])

const gearSet = new Set(['*'])

function checkAdjacentsCoord(input, array, notSymbols) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];


        // check if top is on bounds
        if (element[0] > 0 && !notSymbols.has(input[element[0] - 1][element[1]])
        ) {
            return true
        }

        // //check top left
        if (element[0] > 0 && element[1] > 0 && !notSymbols.has(input[element[0] - 1][element[1] - 1])
        ) {
            return true
        
        }

        // //check top right
        if (element[0] > 0 && element[1] < input[element[0]].length - 1 && !notSymbols.has(input[element[0] - 1][element[1] + 1 ])
        ) {
            return true
        }

        // check if bottom is on bounds
        if (element[0] < input.length - 1  && !notSymbols.has(input[element[0] + 1][element[1]])
        ) {
            return true
        }

         // check if bottom left
         if (element[0] < input.length - 1 && element[1] > 0 && !notSymbols.has(input[element[0] + 1][element[1] - 1])
         ) {
             return true
         }


        // check if bottom right 
        if (element[0] < input.length - 1  && element[1] < input[element[0]].length - 1 && !notSymbols.has(input[element[0] + 1][element[1] + 1])
        ) {
            return true
        }
   
        //check left is on bounds

        if(element[1] > 0 && !notSymbols.has(input[element[0]][element[1] - 1]) 
        ){
            return true
        }

        //check right is on bounds


        if(element[1] < input[element[0]].length - 1 && !notSymbols.has(input[element[0]][element[1] + 1]) 
        ){
            return true
        }

    }

    return false
}

function checkAdjacentsGear(input, array, notSymbols) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        // check if top is on bounds
        if (element[0] > 0 && notSymbols.has(input[element[0] - 1][element[1]])
        ) {
            return 'y' + [element[0] - 1] + 'x' + [element[1]]
        }

        // //check top left
        if (element[0] > 0 && element[1] > 0 && notSymbols.has(input[element[0] - 1][element[1] - 1])
        ) {
            return 'y' + [element[0] - 1] + 'x' + [element[1] - 1]
        }

        // //check top right
        if (element[0] > 0 && element[1] < input[element[0]].length - 1 && notSymbols.has(input[element[0] - 1][element[1] + 1 ])
        ) {
            return 'y' + [element[0] - 1] + 'x' +[element[1] + 1 ]
        }

        // check if bottom is on bounds
        if (element[0] < input.length - 1  && notSymbols.has(input[element[0] + 1][element[1]])
        ) {
            return 'y' + [element[0] + 1] + 'x' +[element[1]]
        }

         // check if bottom left
         if (element[0] < input.length - 1 && element[1] > 0 && notSymbols.has(input[element[0] + 1][element[1] - 1])
         ) {
             return 'y' + [element[0] + 1] + 'x' +[element[1] - 1]
         }


        // check if bottom right 
        if (element[0] < input.length - 1  && element[1] < input[element[0]].length - 1 && notSymbols.has(input[element[0] + 1][element[1] + 1])
        ) {
            return 'y' + [element[0] + 1] + 'x' +[element[1] + 1]
        }
   
        //check left is on bounds

        if(element[1] > 0 && notSymbols.has(input[element[0]][element[1] - 1]) 
        ){
            return 'y' + [element[0]]+ 'x' +[element[1] - 1]
        }

        //check right is on bounds


        if(element[1] < input[element[0]].length - 1 && notSymbols.has(input[element[0]][element[1] + 1]) 
        ){
            return 'y' + [element[0]] + 'x' +[element[1] + 1]
        }

    }

    return false
}

// [ [ 7, 7 ], [ 7, 8 ], [ 7, 9 ] ]

function one(input) {
    let currentNumCoord = []
    let currentNumString = ''
    let total = 0


    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            const element = input[i][j];

            if(!isNaN(element)) {
                currentNumCoord.push([i, j])
                currentNumString += input[i][j]
            } else {
                if(checkAdjacentsCoord(input, currentNumCoord, notSymbolsSet)) {
                    total += +currentNumString
                }

                currentNumCoord = []
                currentNumString = ''
            }

        }
        
    }

    console.log(total)
}

function two(input) {
    let currentNumCoord = []
    let currentNumString = ''
    let total = 0
    let gearsMap = new Map()

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            const element = input[i][j];

            if(!isNaN(element)) {
                currentNumCoord.push([i, j])
                currentNumString += input[i][j]
            } else {
                if(checkAdjacentsGear(input, currentNumCoord, gearSet)) {
                    let coord = checkAdjacentsGear(input, currentNumCoord, gearSet);
                    
                    if (gearsMap.has(coord) ) {
                        gearsMap.get(coord).push(+currentNumString)
                    } else {
                        gearsMap.set(coord, [+currentNumString])
                    }
                }

                currentNumCoord = []
                currentNumString = ''
            }

        }
        
    }

    for (const x of gearsMap.values()) {
        if(x.length === 2) {
            total+= x[0] * x[1]
        }
      }

    console.log(total)
}


// 

console.log('Question one result:')
one(input)

console.log('Question two result:')
two(input)

