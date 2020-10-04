import React, { Component } from 'react'
import Grid from './Grid'
import Abstract from './../Contents/Abstract.js'

const { Generator, Check } = require('./Helpers/helpers.tsx')

interface IState {
  grid?: [],
  width: 10,
  height: 10,
  mines: 12,
  status: String,
  restore: Boolean
}
interface IProps {

}
export default class Game extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      grid: [],
      width: 10,
      height: 10,
      mines: 12,
      status: 'playing',
      restore: false

    };
    this.sweep = this.sweep.bind(this)
    this.Flag = this.Flag.bind(this)
    this.play = this.play.bind(this)
    this.playAgain = this.playAgain.bind(this)


  }
  componentWillMount() {
		document.title =  "Minesweeper - Maths begind it";
		this.play()
  }
  render() {

    let content = (
      <Grid
        grid={this.state.grid}
        sweep={this.sweep}
        status={this.state.status}
        flag={this.Flag}
        playAgain={this.playAgain}
        mines={this.state.mines}
        restore={this.state.restore}
      />
    )
	return (
      <>
        <div>{content}</div>
				<Abstract/>
      </>
    );

  }


  sweep(grid: [], click: [], mine: number, flag: any) {

    if (flag) {
      return
    }
    const updateGrid = Check(grid, click)

    let countRemaing = 0
    for (let i = 0; i < updateGrid.grid.length; i++) {
      for (let j = 0; j < updateGrid.grid[i].length; j++) {
        if (updateGrid.grid[i][j].revealed && !updateGrid.grid[i][j].mine) {
          countRemaing++
        }
      }
    }

    if (countRemaing === Number(this.state.mines)) {
      // You won
      return this.setState({
        grid: updateGrid.grid,
        status: 'won',
      })
    }
    this.setState({
      grid: updateGrid.grid,
      status: mine ? 'lost' : 'playing'

    })
  }

  play() {
    this.setState({
      grid: Generator(this.state.width, this.state.height, this.state.mines)
    })

  }

  playAgain() {
    this.setState({
      grid: Generator(this.state.width, this.state.height, this.state.mines),
      status: 'playing',
      restore: true
    })
  }

  Flag(w: number, h: number, e: any) {
    e.preventDefault()
    let grid: any = this.state.grid
    grid[w][h].flag = !grid[w][h].flag
    this.setState({
      grid: grid
    })
  }
}
