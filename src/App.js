import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer'
import './App.css';
import Rules from './Rules'

// const numRows = 25
// const numCols = 40
const numRows = window.innerWidth < 400 ? 15 : 25
const numCols = window.innerWidth < 400 ? 15 : 40

const colors = ["#DEF335", "#52903F", "#2E5134", "#2E5134", "#5F412F"]

const myNeighbors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1], 
  [1, -1],
  [1, 0],
  [1, 1],
]

const generateEmptyGrid = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0))
  }
  return rows
}

const generateRandomGrid = () => {
  const rows = []
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => {
      return Math.random() > 0.8 ? 1 : 0
    }))
  }
  return rows
}

const App = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  })

  const [running, setRunning] = useState(false)

  // Useref is great for keeping track of the current value in a callback
  const runningRef = useRef(running)
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return
    }
    
    setGrid(currentGrid => {
      return produce(currentGrid, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {

            let neighborCount = 0
            myNeighbors.forEach(([x, y]) => {
              const newI = i + x
              const newJ = j + y
              if (newI >= 0 &&  newI < numRows && newJ >= 0 && newJ < numCols) {
                neighborCount += currentGrid[newI][newJ]
              }
            })

            if (neighborCount < 2 || neighborCount > 3) {
              gridCopy[i][j] = 0
            } else if (neighborCount === 3 && currentGrid[i][j] === 0) {
              gridCopy[i][j] = 1
            }
          }
        }
      })
    })
    setTimeout(runSimulation, 500)
  }, [])

  return (
    <div className="container">
      <h1>Game of Life</h1>
      <Rules/>
      <div className="btn">
        <button 
          onClick={() => {
            setRunning(!running)
            if (!running) {
              runningRef.current = true
              runSimulation()
            }
          }}
          style={{backgroundColor: running ? "red" : "#04d804"}}
        >
          {running ? "STOP" : "Start"}
        </button>

        <button 
          onClick={() => {
          setGrid(generateEmptyGrid())
          }}
          style={{backgroundColor: "lightgrey"}}
        >
          Clear
        </button>

        <button 
          onClick={() => {
            setGrid(generateRandomGrid())
          }}
          style={{backgroundColor: "pink"}}
        >
          Random
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
        className="my-grid"
      >
        {grid.map((row, i) => 
          row.map((col, j) => (
          <div 
            onClick={() => {
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][j] = grid[i][j] ? 0 : 1
              })
              setGrid(newGrid)
            }}
            key={`${i}-${j}`} 
            style={{       
              width: 20,
              height: 20,
              border: "solid 2px black",
              backgroundColor: grid[i][j] ? colors[Math.floor(Math.random()*colors.length)]: undefined
            }} />
          ))
        )}
      </div>
    </div>
  )
}

export default App;
