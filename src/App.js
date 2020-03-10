import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer'
import './App.css';

const numRows = 50
const numCols = 50

const App = () => {
  const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i< numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows
  })

  const [running, setRunning] = useState(false)

  // Useref is good for using the current value in a callback
  const runningRef = useRef(running)
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return
    }
    
    setGrid(val => {
      return produce(val, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0
          }
        }
      })
    })
    setTimeout(runSimulation, 1000)
  }, [])

  return (
    <>
      <button onClick={() => setRunning(!running)}>{running ? "stop" : "start"}</button>

      <div className="display-grid">
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
              backgroundColor: grid[i][j] ? "pink": undefined
            }} />
          ))
        )}
      </div>
    </>
  )
}

export default App;
