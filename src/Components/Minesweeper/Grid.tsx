import React from 'react'
import Row from './Row'

const Grid = (props: any) => {
  const rows = props.grid.map((a: number, i: number) => {

    return (<Row
      key={'row' + i}
      grid={props.grid}
      row={i}
      flag={props.flag}
      cells={a}
      playAgain={props.playAgain}
      sweep={props.sweep}
      status={props.status}
      restore={props.restore}

    />
    )
  })

const wonButton = props.status !== 'playing' ? (
    <div className='buttons'>
      <div className='button-wide' onClick={props.playAgain}>
        <p>PLAY AGAIN</p>
      </div>
    </div>
  ) : ''
  return (
    <div className='grid-cointainer'>
      <h3>Minesweeper</h3>
      <div className='grid'>
        <div className='stat'>
          <label> {props.mines} mines count</label>
        </div>
        {rows}
      </div>
      {wonButton}
    </div>
  )
}

export default Grid
