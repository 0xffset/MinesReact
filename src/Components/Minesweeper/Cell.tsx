import React from 'react'
import './../../App.css'

const Cell = (props: any) => {
  let contents: any = []
  let color = 'white'
  let fontColor = ''
  let removeColorClass = ''
  if (props.cell.mine) {
    contents = ''
  }
  if (props.cell.revealed && !props.cell.mine) {
    if (props.cell.bordering === 0) {
      contents = null;
    }
    if (props.cell.bordering === 1) {
      contents = <p>{props.cell.bordering}</p>
      fontColor = 'blue'
    }
    if (props.cell.bordering === 2) {
      contents = <p>{props.cell.bordering}</p>
      fontColor = 'green'
    }
    if (props.cell.bordering === 3) {
      contents = <p>{props.cell.bordering}</p>
      fontColor = 'red'
    }
    if (props.cell.bordering >= 4) {
      contents = <p>{props.cell.bordering}</p>
      fontColor = 'red'
    }
    removeColorClass = 'remove'
  }

  if (props.cell.flag) {
    contents = <span role="img" aria-label="flag">🚩</span>
    removeColorClass = ''

  }

  if (props.status === 'lost' && props.cell.mine) {
    contents = <span role="img" aria-label="boom">💣</span>
    color = 'red'
    removeColorClass = 'remove'
  }

  if (props.restore === true && props.status === 'playing') {
    removeColorClass = ''

  }

  if (props.status === 'won' && props.cell.mine) {
    color = 'green'

  }
  return (

    <>
      <div
        style={{ color: `${fontColor}` }}
        className={`cell ${color} ${removeColorClass}`}
				onClick={props.sweep.bind(null, props.grid, [props.row, props.column], props.cell.mine, props.cell.flag)}
        onContextMenu={props.flag.bind(null, props.row, props.column)}
      	>
        {contents}
      </div>
    </>
  )
}


export default Cell
