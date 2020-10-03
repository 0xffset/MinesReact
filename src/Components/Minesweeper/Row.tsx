import React from 'react'
import Cell from './Cell'
import './../../App.css'

const Row = (props: any) => {
	const cells = props.cells.map((a:number, i:number ) => {

		return (
			<Cell
			key={'cell' + i}
			cell={a}
			row={props.row}
			grid={props.grid}
			flag={props.flag}
			playAgain={props.playAgain}
			column={i}
			sweep={props.sweep}
			status={props.status}

			/>
			)

		})
	return (
		<div className='row'>
			{cells}
		</div>
		)

}

export default Row
