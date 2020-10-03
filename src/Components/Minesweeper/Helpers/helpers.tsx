

const Generator = (w:number, h:number, mines :number) => {
  let grid:any[] = []
  for (let i = 0; i < h; i++) {
    grid.push([])
  }

  grid.forEach(row => {
    for (let i = 0; i < w; i++) {
      row.push({ mine: false,  flag: false, bordering: 0, revealed: false})
    }

  });
  return getBorders(MinesPositions(w,h,mines).reduce((acc, el, i) => {
    grid[el[1]][el[0]].mine = true
    return grid
  }, grid))

}

const Check = (grid: any[], click: Array<number>) => {

  if (!grid.length) return grid
  let currentCell = grid[click[0]][click[1]]
  if (currentCell.mine) {
    return {
      grid: grid.map((row: [], i) => {
        return row.map((el: any, v: any) => {
          el.revealed = true
          return el
        })
      }),
      result: 'lose'
    }
  }
  if(grid[click[0]][click[1]].bordering) {
    grid[click[0]][click[1]].revealed = true
  }
  return {
    grid: sweep(grid, click),
    result: 'continue'
  }
}



const MinesPositions = (w: number, h: number, mines: number): any[] => {
  let out: any[] = []
  while(out.length < mines) {
    let x = Math.floor(Math.random() * w)
    let y = Math.floor(Math.random() * h)
    let pre = false
    if(out.length) {
      for (let i = 0; i < out.length; i++) {
        if(out[i][0] === x && out[i][1] === y) {
          pre = true
        }
      }
    }
    if (!pre) {
      out.push([x,y])
    }
  }
  return out

}

const getBorders = (grid: any[]) => {
  return grid.map((row: any[], i: number) => {
    return row.map((el: any, v: number) => {
      if (i > 0) {
        if (grid[i-1][v].mine) el.bordering++
        if (v > 0) {
          if (grid[i-1][v].mine) el.bordering++
        }
        if (v < row.length -1) {
          if(grid[i-1][v+1].mine) el.bordering++
        }
      }
      if (v > 0) {
        if (grid[i][v-1].mine) el.bordering++
      }
      if (v < row.length -1) {
        if (grid[i][v+1].mine) el.bordering++
      }
      if (i < grid.length - 1) {
        if (grid[i+1][v].mine) el.bordering++
        if (v > 0) {
          if(grid[i+1][v-1].mine) el.bordering++
        }
        if (v < row.length - 1) {
          if(grid[i+1][v+1].mine) el.bordering++
        }
      }
      return el
    })
  })
}

const hasMine = (row: number, col: number, grid: any[]) : Boolean => {
return (grid[row][col].mine == true) ? true : false
}

const sweep = (grid: any[], click: number[]) => {
    if (grid[click[0]][click[1]].mine || grid[click[0]][click[1]].bordering) {
        return grid;
    }
    if (!grid[click[0]][click[1]].mine) {
        grid[click[0]][click[1]].revealed = true;
    }

    // Row above

    if (click[0] > 0) {

        // Top Centre is bordering but not revealed
        if (grid[click[0]-1][click[1]].bordering && !grid[click[0]-1][click[1]].revealed) {
            // Reveal it
            grid[click[0]-1][click[1]].revealed = true;
        } else if (!grid[click[0]-1][click[1]].bordering && !grid[click[0]-1][click[1]].revealed) {
            // If it's nor bordering and not revealed, recurse it
            grid = sweep(grid, [click[0]-1, click[1]])
        }
        // Top Left is bordering but not revealed
        if (click[1] > 0 && !grid[click[0]-1][click[1]].mine && !grid[click[0]][click[1] - 1].mine) {
            if (grid[click[0]-1][click[1]-1].bordering && !grid[click[0]-1][click[1] - 1].revealed) {
                // Reveal it
                grid[click[0]-1][click[1]-1].revealed = true;
            } else if (!grid[click[0]-1][click[1]-1].bordering && !grid[click[0]-1][click[1]].revealed) {
                // If it's nor bordering and not revealed, recurse it
                grid = sweep(grid, [click[0]-1, click[1]-1])
            }
        }

        // Top Right is bordering but not revealed
        if (click[1] < grid[click[0]].length - 1 && !grid[click[0]-1][click[1]].mine && !grid[click[0]][click[1] + 1].mine) {
            if (grid[click[0]-1][click[1]+1].bordering && !grid[click[0]-1][click[1]+1].revealed) {
                // Reveal it
                grid[click[0]-1][click[1]+1].revealed = true;
            } else if (!grid[click[0]-1][click[1]+1].bordering && !grid[click[0]-1][click[1]+1].revealed) {
                // If it's nor bordering and not revealed, recurse it
                grid = sweep(grid, [click[0]-1, click[1]+1])
            }
        }
    }

    // Left

    if (click[1] > 0) {
        if (grid[click[0]][click[1]-1].bordering && !grid[click[0]][click[1]-1].revealed) {
            // Reveal it
            grid[click[0]][click[1]-1].revealed = true;
        } else if (!grid[click[0]][click[1]-1].bordering && !grid[click[0]][click[1]-1].revealed) {
            // If it's nor bordering and not revealed, recurse it
            grid = sweep(grid, [click[0], click[1]-1])
        }
    }

    // Right

    if (click[1] < grid[click[0]].length - 1) {
        if (grid[click[0]][click[1]+1].bordering && !grid[click[0]][click[1]+1].revealed) {
            // Reveal it
            grid[click[0]][click[1]+1].revealed = true;
        } else if (!grid[click[0]][click[1]+1].bordering && !grid[click[0]][click[1]+1].revealed) {
            // If it's nor bordering and not revealed, recurse it
            grid = sweep(grid, [click[0], click[1]+1])
        }
    }

    // Row below
    if (click[0] < grid.length - 1) {
        // Bottom Centre is bordering but not revealed
        if (grid[click[0]+1][click[1]].bordering && !grid[click[0]+1][click[1]].revealed) {
            // Reveal it
            grid[click[0]+1][click[1]].revealed = true;
        } else if (!grid[click[0]+1][click[1]].bordering && !grid[click[0]+1][click[1]].revealed) {
            // If it's nor bordering and not revealed, recurse it
            grid = sweep(grid, [click[0]+1, click[1]])
        }

        // Bottom Left is bordering but not revealed
        if (click[1] > 0 && !grid[click[0]+1][click[1]].mine && !grid[click[0]][click[1] - 1].mine) {
            if (grid[click[0]+1][click[1]-1].bordering && !grid[click[0]+1][click[1] - 1].revealed) {
                // Reveal it
                grid[click[0]+1][click[1]-1].revealed = true;
            } else if (!grid[click[0]+1][click[1]-1].bordering && !grid[click[0]+1][click[1]].revealed) {
                // If it's nor bordering and not revealed, recurse it
                grid = sweep(grid, [click[0]+1, click[1]-1])
            }
        }

        // Bottom Right is bordering but not revealed
        if (click[1] < grid[click[0]].length - 1 && !grid[click[0]+1][click[1]].mine && !grid[click[0]][click[1] + 1].mine) {
            if (grid[click[0]+1][click[1]+1].bordering && !grid[click[0]+1][click[1]+1].revealed) {
                // Reveal it
                grid[click[0]+1][click[1]+1].revealed = true;
            } else if (!grid[click[0]+1][click[1]+1].bordering && !grid[click[0]+1][click[1]+1].revealed) {
                // If it's nor bordering and not revealed, recurse it
                grid = sweep(grid, [click[0]+1, click[1]+1])
            }
        }

    }

    return grid
}

export {
  Check,
  Generator,
}
