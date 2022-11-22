'use strict'

const PACMAN = '😷'
var gPacman
var gDeadGhosts = []
var lastSuperFoodP = {
    i: -1,
    j: -1
}


function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    gFoodCount--
}

function movePacman(ev) {
    if (!gGame.isOn) return

    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        return
    } else if (nextCell === GHOST && gPacman.isSuper) {
        updateScore(10)
        for (var i = 0; i < gGhosts.length; i++) {
            console.log(gGhosts[i].location, nextLocation);
            if (gGhosts[i].location.i === nextLocation.i &&
                gGhosts[i].location.j === nextLocation.j) {
                // gGhosts[i].slice(i, 1)
                console.log('hi');
                gDeadGhosts.push(gGhosts[i])
                gGhosts.splice(i, 1)
                console.log(gGhosts);
            }
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gFoodCount--

    }
    if (nextCell === CHERRY) {
        updateScore(10)
        // gFoodCount--
    }

    if (nextCell === SUPERFOOD &&
        !gPacman.isSuper) {

        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            gGhosts = gGhosts.concat(gDeadGhosts)

        }, 5000);

        updateScore(5)

    } else if (nextCell === SUPERFOOD && gPacman.isSuper) {

        lastSuperFoodP = {
            i: nextLocation.i,
            j: nextLocation.j
        }

    }

    // DONE: moving from current location:
    // DONE: update the model

    if (gPacman.location.i === lastSuperFoodP.i
        && gPacman.location.j === lastSuperFoodP.j) {
        gBoard[gPacman.location.i][gPacman.location.j] = SUPERFOOD
        // DONE: update the DOM
        renderCell(gPacman.location, SUPERFOOD)

    } else {
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // DONE: update the DOM
        renderCell(gPacman.location, EMPTY)

    }


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
    isGameDone()
}


function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}