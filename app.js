const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')

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
        console.log('Delete letter')
        return
    }
    if(key === 'ENTER'){
        console.log('check row')
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

