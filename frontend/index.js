// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', (event) => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        document.querySelector(".targeted").classList.remove("targeted")
        square.classList.add("targeted")
        event.stopPropagation()
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  let target = () => document.querySelector(".targeted")
  let cousinIdx = () => {
    let cIdx
    let targetSibs = document.querySelector(".targeted").parentElement.children
    let sibsArray = Array.from(targetSibs)
    sibsArray.forEach(
      (child, idx) => {
        if (child.classList.contains("targeted")) {
          cIdx = parseInt(idx)
        }
      }
    )
    return cIdx
  }

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    if (evt.key === "ArrowRight") {
      if (target().nextElementSibling === null) {
        console.log("Out of bounds")
      } else {
        target().nextElementSibling.classList.add("targeted")
        target().classList.remove("targeted")
      }
    } 
    else if (evt.key === "ArrowLeft") {
      if (target().previousElementSibling === null) {
        console.log("Out of bounds")
      } else {
        target().previousElementSibling.classList.add("targeted")
        target().nextElementSibling.classList.remove("targeted")
      }
    } 
    else if (evt.key === "ArrowUp") {
      if (target().parentElement.previousElementSibling === null){
        console.log("Out of bounds")
      } else {
        target().parentElement.previousElementSibling.children[cousinIdx()].classList.add("targeted")
        target().parentElement.nextElementSibling.children[cousinIdx()].classList.remove("targeted")
      }
    }
    else if (evt.key === "ArrowDown") {
      if (target().parentElement.nextElementSibling === null) {
        console.log("Out of bounds")
      } else {
        target().parentElement.nextElementSibling.children[cousinIdx()].classList.add("targeted")
        target().classList.remove("targeted")
      }
    }
    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    else if (evt.key === " ") {
      if ((target().children.length > 0) && 
      (target().firstChild.dataset.status === "alive")) {
        target()["firstChild"]["dataset"]["status"] = "dead"
        target()["style"]["background-color"] = "red"
        if (document.querySelectorAll("img[data-status = alive]").length === 0) {
          console.log("on the right track")
          document.querySelector("p.info").textContent = `Extermination completed in ${getTimeElapsed() / 1000} seconds!`
          let restartButton = document.createElement("button")
          restartButton.textContent = "Restart"
          restartButton.addEventListener("click", () => location.reload())
          document.querySelector("header h2").appendChild(restartButton)

        }
      }
    }
    // 👉 TASK 5 - End the game 👈
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
