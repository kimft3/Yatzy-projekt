let dice = [1, 2, 3, 4, 5]
let diceHeld = [false, false, false, false, false]
let throwCount = 0
let selectedInTurn = -1
let roundCount = 0

function rollDice() {
    if (throwCount < 3) {
        for (let i = 0; i < 5; i++) {
            if (!diceHeld[i]) {
                dice[i] = Math.floor((Math.random() * 6) + 1)
            }
        }
        throwCount++
        updateFieldsAfterRoll()
    } else if (selectedInTurn == -1) {
        throwNoChoiceAlert()
    } else {
        resultFieldNodeHeld[selectedInTurn] = true 
        selectedInTurn = -1
        roundCount++
        calcSum()
        gameEndAlert()
    }
}

function resetRoundGame() {
    diceHeld = [false, false, false, false, false]
    throwCount = 0
    if(roundCount==15){
        for(let i=0;i<15;i++){
            resultFieldNodeHeld[i]=false;
        }
    }
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

function calcSum(){
    let sumTextNode = 0
    for (let i = 0; i <= 5; i++){
        if (resultFieldNodeHeld[i]) {
            sumTextNode += parseInt(resultFieldNodes[i].value)
        }
    }
    return sumTextNode
}
function calcTotal(){
    let totalTextNode = 0
    for (let i = 0; i < 15; i++){
        if (resultFieldNodeHeld[i]) {
            totalTextNode += parseInt(resultFieldNodes[i].value)
            resultFieldNodes[i].style.color='red';
        }
    }
    return totalTextNode
}
//---------------------------------------------------------------------------//

const turnCountNode = document.getElementById("turnCounter")
const dieSlotNodes = [document.getElementById("die1"),
    document.getElementById("die2"),
    document.getElementById("die3"),
    document.getElementById("die4"),
    document.getElementById("die5")
]
const dieFacesIMG = ["<img src='images/diceone.png' style='height: 40px;'</img>",
    "<img src='images/dicetwo.png' style='height: 40px;'></img>",
    "<img src='images/dicethree.png' style='height: 40px;'></img>",
    "<img src='images/dicefour.png' style='height: 40px;'></img>",
    "<img src='images/dicefive.png' style='height: 40px;'></img>",
    "<img src='images/dicesix.png' style='height: 40px;'></img>"
]

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

const resultFieldNodeHeld = []
for (let i = 0; i < 15; i++){
    resultFieldNodeHeld[i] = false
}
for (let i = 0; i < 15; i++){
    resultFieldNodes[i].addEventListener('click', e => selectPointField(i))
}

function selectPointField(i){
    if (!resultFieldNodeHeld[i]){
        selectedInTurn = i
    }
}

const rollBtn = document.getElementById("roller")
rollBtn.addEventListener('click', e => rollDice())

for (let i = 0; i < 5; i++) {
    dieSlotNodes[i].innerHTML = dieFacesIMG[i]
}


for (let i = 0; i < 6; i++){
  dieSlotNodes[i].addEventListener('click', e => hold(i))
}

function hold(i){
    if (!diceHeld[i]){
        diceHeld[i] = true
        dieSlotNodes[i].innerHTML += "<br>Held" 
   } else {
       let die = (dice[i] - 1)
        diceHeld[i] =false
        dieSlotNodes[i].innerHTML = dieFacesIMG[die] 
    }
}

function gameEndAlert() {
    if (roundCount < 15) {
        alert('Round Over')
    } else {
        alert('Game Over')
    }
    resetRoundGame()
    updateGUI()
}

function throwNoChoiceAlert() {
    alert('Please choose some points to keep for the next round')
}

function updateGUI() {
    //throwCount
    turnCountNode.innerText = "Turn " + throwCount
    //Dice display
    for (let i = 0; i < 5; i++) {
        dieSlotNodes[i].innerHTML = dieFacesIMG[i]
    }
    //Point fields
    for (let i = 0; i <= 14; i++) {
        if (!resultFieldNodeHeld[i] || roundCount == 15){
        resultFieldNodes[i].value = 0
        resultFieldNodes[i].style.color='black'
        }
    }
    let sum=calcSum()
    let total=calcTotal();
     document.getElementById('sumText').value=sum
     if(sum>49){
     document.getElementById('bonusText').value=50
    total+=50
    }else{
        document.getElementById('bonusText').value=0;  
    }
    document.getElementById('TotalText').value=total
}

function updateFieldsAfterRoll() {
    //throwCount
    turnCountNode.innerText = "Turn " + throwCount
    //Dice display
    for (let i = 0; i < 5; i++) {
        let j = (dice[i] - 1)
        if (!diceHeld[i]){
        dieSlotNodes[i].innerHTML = dieFacesIMG[j]
        }
    }
    //Point fields
    for (let i = 0; i <= 14; i++){
        if (!resultFieldNodeHeld[i]) {
        resultFieldNodes[i].value = getResults()[i]
        }
    }
}