const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'SUPER'

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow,guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', `guessRow-${guessRowIndex}` )
    guessRow.forEach((guess,guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', `guessRow-${guessRowIndex}-tile-${guessIndex}` )
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})


keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (key) => {
    console.log('clicked', key)
    if(key === '«'){
        deleteLetter()
        return
    }
    if(key === 'ENTER'){
        checkRow()
        return
    }
    addLetter(key)
}

//want to make sure that when you click on letter it is addded to correct tile

const addLetter = (letter) => {
    if(currentTile < 5 && currentRow <6 ){
    //grab the tile you want to put the letter in
    const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`)
    tile.textContent = letter
    //check guesses to see if inputed letter matches corresponding letter in word
    guessRows[currentRow][currentTile] = letter
    //data attribute is used to colour letters
    tile.setAttribute('data',letter)
    currentTile++
    console.log('guessRows', guessRows)
    }
   
}

const deleteLetter = () => {
    if(currentTile > 0){
        currentTile--
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data','')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if(currentTile > 4){
        console.log(`guess is: ${guess} word is: ${wordle}`)
        flipTile()
        if(wordle == guess){
            showMessage('Magnificent!')
            isGameOver = true
            return
        } else {
            if(currentRow >= 5){
                isGameOver = false // is this meant to be true?
                showMessage('Game over')
                return
            }
            if(currentRow < 5){
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const flipTile = () => {
    const rowTiles = document.querySelector(`#guessRow-${currentRow}`).childNodes
    rowTiles.forEach((tile,index) => {
       const dataLetter =  tile.getAttribute('data')

       if(dataLetter == wordle[index]){
        tile.classList.add('green-overlay')
       }else if(wordle.includes(dataLetter)){
        tile.classList.add('yellow-overlay')
       }else {
        tile.classList.add('grey-overlay')
       }
    })
}