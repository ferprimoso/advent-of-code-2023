const fs = require("fs")

//readfile syncronos
input = fs.readFileSync('./inputs/day1.txt',"utf-8").split(/\n/)

const digits = {
    'one' : '1', 
    'two' : '2', 
    'three' : '3', 
    'four' : '4', 
    'five' : '5', 
    'six' : '6', 
    'seven' : '7', 
    'eight': '8',
    'nine': '9'
}


// part 1

// function findCalibrationValue(string) {
//     let leftPointer = 0
//     let rightPointer = string.length - 1
//     let firstDigit = ''
//     let lastDigit = ''

//     while (firstDigit === '') {
//        if(!isNaN(string[leftPointer])) {
//         firstDigit = string[leftPointer]
//        } else {
//         leftPointer++
//        }
//     }
    
//     while (lastDigit === '') {
//         if(!isNaN(string[rightPointer])) {
//          lastDigit = string[rightPointer]
//         } else {
//             rightPointer--
//         }
//      }

//     return parseInt(firstDigit + lastDigit)
// }

// part 2

function findCalibrationValue(string) {
    let leftPointer = 0
    let rightPointer = string.length - 1
    let firstDigit = ''
    let lastDigit = ''

    while (firstDigit === '') {
       if(!isNaN(string[leftPointer])) {
        firstDigit = string[leftPointer]
       } else if(string.substring(leftPointer, leftPointer + 3) in digits){
            firstDigit = digits[string.substring(leftPointer, leftPointer + 3)]
       } else if(string.substring(leftPointer, leftPointer + 4) in digits) {
            firstDigit = digits[string.substring(leftPointer, leftPointer + 4)]

       } else if (string.substring(leftPointer, leftPointer + 5) in digits) {
            firstDigit = digits[string.substring(leftPointer, leftPointer + 5)]
       }
       else {
        leftPointer++
       }
    }
    
    while (lastDigit === '') {
        if(!isNaN(string[rightPointer])) {
         lastDigit = string[rightPointer]
        } else if(string.substring(rightPointer, rightPointer + 3) in digits){
             lastDigit = digits[string.substring(rightPointer, rightPointer + 3)]
        } else if(string.substring(rightPointer, rightPointer + 4) in digits) {
             lastDigit = digits[string.substring(rightPointer, rightPointer + 4)]
 
        } else if (string.substring(rightPointer, rightPointer + 5) in digits) {
             lastDigit = digits[string.substring(rightPointer, rightPointer + 5)]
        }
        else {
         rightPointer--
        }
     }

    return parseInt(firstDigit + lastDigit)
}



let sumOfCalibrationsValue = 0

for (let i = 0; i < input.length; i++) {
    sumOfCalibrationsValue += findCalibrationValue(input[i])
}

console.log(sumOfCalibrationsValue);