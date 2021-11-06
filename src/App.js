import { useEffect, useState } from "react"

const width = 8
const candyColors = [
  'blue', // blue
  'green', // green
  'orange', // orange
  'purple', // purple
  'red', // red
  'yellow' // yellow
]

const App = () => {
  const [currentColorArrangement, setcurrentColorArrangement] = useState([])

  const checkForColumnOfThree = () => {
    for (let i = 0; i< 47; i++ ) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {

        columnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i< 39; i++ ) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]

      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {

        columnOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const createBoard = () => {

    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setcurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree()
      checkForColumnOfFour()
      setcurrentColorArrangement([...currentColorArrangement]) // ... is spread syntax - takes array, expands into individual elems
    }, 100)
    return () => clearInterval(timer)
    
  }, [checkForColumnOfFour, checkForColumnOfThree, currentColorArrangement])

  console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
