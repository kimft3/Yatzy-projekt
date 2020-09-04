let dice = []
let throwCount = 0
let ones, twos, threes, fours, fives, sixes = 0

function rollDice() {
for (let i = 0; i < 5; i++) {
    dice[i] = Math.floor((Math.random()* 6 )+ 1)
    }
    throwCount++
}



// For testing
rollDice()

console.log(dice.toString())
console.log(throwCount)

rollDice()

console.log(dice.toString())
console.log(throwCount)
