'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '※'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}

var gFoodCount
var gBoard
var gCherryInterval

function onInit() {
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(() => {
        randomCherryApear(gBoard)
    }, 15000);
}

function buildBoard() {
    const size = 10
    const board = []
    gFoodCount = 0

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFoodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gFoodCount--
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === 8 ||
                i === 8 && j === 1 ||
                i === 8 && j === 8) {
                board[i][j] = SUPERFOOD
                gFoodCount--
            }

        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}


//a game-over modal with a play again button should be 
//displayed.
function restartGame() {
    var res = confirm('the game is over, would you like to start over?')
    if (res) {
        gGhosts = []
        gPacman.isSuper = false
        // gPacman.location = { i: 2, j: 2 }
        gBoard = buildBoard()
        createGhosts(gBoard)
        createPacman(gBoard)
        renderBoard(gBoard, '.board-container')
        gGame.isOn = true

        gGame.score = 0
        document.querySelector('h2 span').innerText = gGame.score
        gDeadGhosts = []
        gCherryInterval = setInterval(() => {
            randomCherryApear(gBoard)
        }, 15000);
    }
}

//When all food is collected - game done – show victorious 
//modal with a play again button

function isGameDone() {
    // console.log(gFoodCount);
    if (gFoodCount === 0) {
        alert('You Won!! you\'v got: ' + gGame.score + ' points')
        clearInterval(gIntervalGhosts)
        clearInterval(gCherryInterval)
        gGame.isOn = false
        restartGame()
    }

}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)

    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    restartGame()
}

function randomCherryApear(board) {
    var cells = []

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]

            if (currCell === WALL) continue
            if (currCell === SUPERFOOD) continue
            if (currCell === PACMAN) continue
            if (currCell === GHOST) continue

            var currCellLocation = {
                i: i,
                j: j
            }
            cells.push(currCellLocation)
        }

    }

    var rendIdx = getRandomIntInclusive(0, cells.length)

    var cell = cells[rendIdx]
    gBoard[cell.i][cell.j] = CHERRY
    // gFoodCount--

    renderCell(cell, CHERRY)

}