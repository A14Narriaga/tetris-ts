import './style.css'

const canvas = document.querySelector('canvas')!;
const context = canvas.getContext('2d')!;

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,0,0,1,1,1,1],
]

const piece = {
  position: {x: 5, y: 5},
  shape: [
    [1, 1],
    [1, 1]
  ]
}

function update() {
  draw()
  window.requestAnimationFrame(update)
}

function draw() {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1) {
        context.fillStyle = 'cyan'
        context.fillRect(x, y, 1, 1)
      }
    })
  })
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
        if(value === 1) {
        context.fillStyle = 'red'
        const {x:xp, y: yp} = piece.position
        context.fillRect(x+xp, y+yp, 1, 1)
      }
    })
  })
}

function checkColision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return value !== 0 && 
      board[y + piece.position.y]?.[x + piece.position.x] !== 0
    })
  }) 
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0) {
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })
  piece.position.x = 0
  piece.position.y = 0
  removeRows()
}

interface Coodinates {
  x: number,
  y: number
}

function removeRows() {
  let rowsToRemove: Coodinates[] = []
  board.forEach((row, y) => {
    let cont = 0
    row.forEach((value, x) => {
      if(value === 1) {
        cont++
        rowsToRemove.push({x, y})
      }
    })
    console.log(cont, BOARD_WIDTH);
    if(cont === BOARD_WIDTH) {
      for(const {x: xr, y: yr} of rowsToRemove) {
        board[xr][yr] = 0
      }
    } else {
      rowsToRemove = []
    }
  })
}

document.addEventListener('keydown', (event) => {
  if(event.key === 'ArrowLeft') {
    piece.position.x--
    if(checkColision()) piece.position.x++
  }
  if(event.key === 'ArrowRight') {
    piece.position.x++
    if(checkColision()) piece.position.x--
  }
  if(event.key === 'ArrowDown') {
    piece.position.y++
    if(checkColision()) {
      piece.position.y--
      solidifyPiece()
    }
  }
})

update()
