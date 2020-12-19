//constants
const GAME_STATE_STARTED = 0;
const GAME_STATE_ENDED = 1;

//HTML elements
const playerSpan = document.getElementById('player');
const gameTable = document.getElementById('game') 

const game = {
    state: GAME_STATE_STARTED,
    turn:'X',
    move: 0
}

function endGame(winner) {
    if(winner) {
        alert(`Winner is ${winner}.`)
    } else {
        alert(`DRAW`)
    }
    game.state = GAME_STATE_ENDED
}

function resetGame() {
    if(Math.random() > 0.5) game.turn = '0'
    else game.turn = 'X'

    game.state = GAME_STATE_STARTED
    Array.from(document.getElementsByTagName('td')).forEach(cell => {
        cell.textContent = ''
    })
}

function nextTurn() {
    if(game.state === GAME_STATE_ENDED) return
    game.move++
    if(game.turn == 'X') {
        game.turn = '0'
    } else {
        game.turn = 'X'
    }

    if(game.move == 9) {
        alert("Game Over")
    }

    playerSpan.textContent = game.turn
}

function isSeqCaptured(arrayOf3Cells) {
    let winningCombo = game.turn + game.turn + game.turn
    if(arrayOf3Cells.map(i => i.textContent).join('') === winningCombo) {
        endGame(game.turn)
    }
}

function isRowCaptured(row) {
    let tableRow = Array.from(gameTable.children[0].children[row-1].children)
    isSeqCaptured(tableRow)
}

function isColCaptured(col) {
    let tableCol = [
        gameTable.children[0].children[0].children[col-1],
        gameTable.children[0].children[1].children[col-1],
        gameTable.children[0].children[2].children[col-1],
    ]
    isSeqCaptured(tableCol)

}

function isDiagonalCaptured(row, col) {
    if(row !== col && (row+col) !== 4) return
    let diag1 = [
        gameTable.children[0].children[0].children[0],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[2],
    ]

    let diag2 = [
        gameTable.children[0].children[0].children[2],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[0],
    ]
    isSeqCaptured(diag1)
    isSeqCaptured(diag2)

}   

function boxClicked(row, col) {
    console.log(`${row}, ${col}` )
    let clickBox = gameTable.children[0].children[row-1].children[col-1]
    clickBox.textContent = game.turn
    isRowCaptured(row)
    isColCaptured(col)
    isDiagonalCaptured(row, col)
    nextTurn()
}