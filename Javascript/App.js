let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('../Assets/eatt.mp3')
const gameOverSound = new Audio('../Assets/gameOver.mp3')
const moveSound = new Audio('../Assets/movement.mp3')
const music = new Audio('../Assets/gameMusic.mp3')
let speed = 3
let score = 0
let lastPaintTime = 0
let snakeArray = [
  {
    x: 13,
    y: 15,
  },
]

let food = { x: 7, y: 3 }
let token = { x: 11, y: 5 }
let tokenX = { x: 2, y: 10 }
// Games Logical requirements //

function main(ctime) {
  window.requestAnimationFrame(main)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return
  }
  lastPaintTime = ctime

  gameEngine()
}

function isCollide(snake) {
  for (let i = 1; i < snakeArray.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true
    }
  }
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true
  }
}

function gameEngine() {
  music.play()
  if (isCollide(snakeArray)) {
    gameOverSound.play()
    music.pause()
    speed = 3
    inputDir = { x: 0, y: 0 }
    alert('Game Over')
    snakeArray = [{ x: 13, y: 15 }]
    score = 0

    // if (score > 3) {
    //   setTimeout(() => {
    //     tokenElement = document.createElement('div')
    //     tokenElement.style.gridRowStart = token.y
    //     tokenElement.style.gridColumnStart = token.x
    //     tokenElement.classList.add('token')
    //     board.appendChild(tokenElement)
    //   }, 2000)
    // }
  }
  // eating Algorithm
  if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
    foodSound.play()
    score += 1
    if (score > hiscoreval) {
      hiscoreval = score
      document.querySelector('.highScore').innerHTML = `hiScore ` + hiscoreval
      localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
    }

    snakeArray.unshift({
      x: snakeArray[0].x + inputDir.x,
      y: snakeArray[0].y + inputDir.y,
    })

    if (score % 10 == 0) {
      speed += 1
    }

    // To generate the Target

    let a = 1
    let b = 16

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }
    token = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }
    tokenX = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }

    hsa()
  }

  // highScoreAlert
  function hsa() {
    if (score >= hiscore - 3 && score < hiscore) {
      document.querySelector('.highScore').classList.add('almost')
    } else {
      document.querySelector('.highScore').classList.remove('almost')
    }
  }

  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] }
  }

  snakeArray[0].x += inputDir.x
  snakeArray[0].y += inputDir.y

  board.innerHTML = ''
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = e.y
    snakeElement.style.gridColumnStart = e.x

    if (index === 0) {
      snakeElement.classList.add('head')
    } else {
      snakeElement.classList.add('snake')
    }
    board.appendChild(snakeElement)
  })

  foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  board.appendChild(foodElement)

  if (score > 3 && score % 5 == 0) {
    tokenElement = document.createElement('div')
    tokenElement.style.gridRowStart = token.y
    tokenElement.style.gridColumnStart = token.x
    tokenElement.classList.add('token')
    board.appendChild(tokenElement)
    if (snakeArray[0].y === token.y && snakeArray[0].x === token.x) {
      snakeArray.shift()
      board.removeChild(tokenElement)
      tokenElement.classList.remove('token')
      score += 1
    }
  }

  if (score > 10 && score % 10 == 0) {
    tokenElementX = document.createElement('div')
    tokenElementX.style.gridRowStart = tokenX.y
    tokenElementX.style.gridColumnStart = tokenX.x
    tokenElementX.classList.add('tokenX')
    board.appendChild(tokenElementX)
    if (snakeArray[0].y === tokenX.y && snakeArray[0].x === tokenX.x) {
      board.removeChild(tokenElementX)
      tokenElement.classList.remove('tokenX')
      speed += 5
      score += 1
      setTimeout(() => {
        speed -= 4
      }, 5000)
    }
  }
}

let hiscore = localStorage.getItem('hiscore')
if (hiscore === null) {
  hiscoreVal = 0
  localStorage.setItem('hiscore', JSON.stringify(hiscoreVal))
} else {
  hiscoreval = JSON.parse(hiscore)
  document.querySelector('.highScore').innerHTML = 'HighScore ' + hiscore
}

window.requestAnimationFrame(main)

window.addEventListener('keydown', (e) => {
  inputDir = { x: 0, y: 1 }
  moveSound.play()
  switch (e.key) {
    case 'ArrowUp':
      console.log('ArrowUp')
      inputDir.x = 0
      inputDir.y = -1
      break

    case 'ArrowDown':
      console.log('ArrowDown')
      inputDir.x = 0
      inputDir.y = 1
      break

    case 'ArrowLeft':
      console.log('ArrowLeft')
      inputDir.x = -1
      inputDir.y = 0
      break

    case 'ArrowRight':
      console.log('ArrowRight')
      inputDir.x = 1
      inputDir.y = 0
      break

    default:
      break
  }
  document.querySelector(
    '.scorbox'
  ).innerHTML = `Score is ${score}  \<br>\ speed is ${speed - 2}`
})
