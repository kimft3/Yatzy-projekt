let dice = [1, 2, 3, 4, 5]
let diceHeld = [false, false, false, false, false]
let throwCount = 0
let ones, twos, threes, fours, fives, sixes = 0

function rollDice() {
    if (throwCount < 3) {
        for (let i = 0; i < 5; i++) {
            if (!diceHeld[i]) {
                dice[i] = Math.floor((Math.random() * 6) + 1)
            }
        }
        throwCount++
        updateFieldsAfterRoll()
    } else {
        gameEndAlert()
    }
}

function resetGame() {
    diceHeld = [false, false, false, false, false]
    throwCount = 0
}

function frequency() {
    let freq = [0, 0, 0, 0, 0, 0, 0]
    for (let i = 1; i < 7; i++) {
        for (let j = 0; j < dice.length; j++) {
            if (dice[j] == i) {
                freq[i]++
            }
        }
    }
    return freq
}

function sameValuePoints(value) {
    let svPoints = frequency()[value]
    let points = svPoints * value
    return points
}

function onePairPoints() {
    let temp = 0
    let f = frequency()
    for (let i = 1; i < f.length; i++) {
        if (f[i] > 1) {
            if (temp < i + i) {
                temp = i + i
            }
        }
    }
    return temp
}

function twoPairPoints() {
    let value = onePairPoints()
    let value1 = 0
    let temp = 0
    let f = frequency()
    for (let i = 1; i < f.length; i++) {
        if (f[i] > 1 && i != value / 2) {
            if (temp < i + i) {
                temp = i + i
            }
            value1 = value + temp
        }
    }
    return value1
}

function threeSamePoints() {
    let value = 0
    let f = frequency()
    for (let i = 1; i < f.length; i++) {
        if (f[i] >= 3) {
            value = i * 3
        }
    }
    return value
}

function fourSamePoints() {
    let value = 0
    let f = frequency()
    for (let i = 1; i < f.length; i++) {
        if (f[i] >= 4) {
            value = i * 4
        }
    }
    return value
}

function fullHousePoints() {
    let temp = 0
    let twoPairs = twoPairPoints()
    let threeSame = threeSamePoints()
    if (threeSame > 0 && twoPairs > 0) {
        temp = twoPairs + (threeSame / 3)
    }
    return temp
}

function smallStraightPoints() {
    let count = 0
    let value = 0
    let f = frequency()
    for (let i = 1; i <= 5; i++) {
        if (f[i] == 1) {
            count++
        }
    }
    if (count == 5) {
        value = 15
    }
    return value
}

function largeStraightPoints() {
    let count = 0
    let value = 0
    let f = frequency()
    for (let i = 2; i <= 6; i++) {
        if (f[i] == 1) {
            count++
        }
    }
    if (count == 5) {
        value = 20
    }
    return value
}

function chancePoints() {
    let value = 0
    for (let i = 0; i < 5; i++) {
        value += dice[i]
    }
    return value
}

function yatzyPoints() {
    let value = 0
    let f = frequency()
    for (let i = 1; i < f.length; i++) {
        if (f[i] >= 5) {
            value = 50
        }
    }
    return value
}

function getResults() {
    let results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i <= 5; i++) {
        results[i] = sameValuePoints(i + 1)
    }
    results[6] = onePairPoints()
    results[7] = twoPairPoints()
    results[8] = threeSamePoints()
    results[9] = fourSamePoints()
    results[10] = fullHousePoints()
    results[11] = smallStraightPoints()
    results[12] = largeStraightPoints()
    results[13] = chancePoints()
    results[14] = yatzyPoints()
    return results
}

function showThrow() {
    let string = "Turn" + throwCount
    return string
}

//---------------------------------------------------------------------------//

const turnCountNode = document.getElementById("turnCounter")

const dieSlotNodes = [document.getElementById("die1"),
    document.getElementById("die2"),
    document.getElementById("die3"),
    document.getElementById("die4"),
    document.getElementById("die5")
]

const dieFacesIMG = ["<img src='images/diceone.png' style='height: 40px;'></img>",
    "<img src='images/dicetwo.png' style='height: 40px;'></img>",
    "<img src='images/dicethree.png' style='height: 40px;'></img>",
    "<img src='images/dicefour.png' style='height: 40px;'></img>",
    "<img src='images/dicefive.png' style='height: 40px;'></img>",
    "<img src='images/dicesix.png' style='height: 40px;'></img>"
]

for (let i = 0; i < 5; i++) {
    dieSlotNodes[i].innerHTML = dieFacesIMG[i]
}

const resultFieldNodes = [document.getElementById('onesText'),
    document.getElementById('twosText'),
    document.getElementById('threesText'),
    document.getElementById('foursText'),
    document.getElementById('fivesText'),
    document.getElementById('sixesText'),
    document.getElementById('OnePairText'),
    document.getElementById('TwoPairText'),
    document.getElementById('ThreeSameText'),
    document.getElementById('FourSameText'),
    document.getElementById('FullHouseText'),
    document.getElementById('SmallStraightText'),
    document.getElementById('LargeStraightText'),
    document.getElementById('ChanceText'),
    document.getElementById('YatzyText')
]

const rollBtn = document.getElementById("roller")
rollBtn.addEventListener('click', e => rollDice())

function gameEndAlert() {
    alert('Spil slut')
    resetGame()
    resetGUI()
}

//Resets GUI after game end
function resetGUI() {
    //throwCount
    turnCountNode.innerText = "Turn " + throwCount
    //Dice display
    for (let i = 0; i < 5; i++) {
        dieSlotNodes[i].innerHTML = dieFacesIMG[i]
    }
    //Point fields
    for (let i = 0; i <= 14; i++) {
        resultFieldNodes[i].value = 0
    }
}

function updateFieldsAfterRoll() {
    //throwCount
    turnCountNode.innerText = "Turn " + throwCount
    //Dice display
    for (let i = 0; i < 5; i++) {
        let j = (dice[i] - 1)
        dieSlotNodes[i].innerHTML = dieFacesIMG[j]
    }
    //Point fields
    for (let i = 0; i <= 14; i++){
        resultFieldNodes[i].value = getResults()[i]
    }

}