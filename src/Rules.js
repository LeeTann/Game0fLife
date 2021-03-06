import React from 'react'

export default function Rules() {
    return (
        <div>
            <ol>
                <h2>Rules</h2>
                <li>
                Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                </li>
                <li>
                Any live cell with two or three live neighbours lives on to the next generation.
                </li>
                <li>
                Any live cell with more than three live neighbours dies, as if by overpopulation. 
                </li>
                <li>
                Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.     
                </li>
            </ol>
            <p style={{fontWeight: "bolder"}}>
                Choose some connecting cells, hit the start button and see what happens!
            </p>
        </div>
    )
}
