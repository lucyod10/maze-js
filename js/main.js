let cols, rows;
// the width of the cells
let w = 40;
let grid = [];

function setup() {
  createCanvas(400, 440);
  cols = floor(width/w);
  rows = floor(height/w);

  // loop through all the rows, and all the cells to fill the grid array with cells.
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }
}



function draw() {
  background(51);

  for (let i = 0; i < grid.length; i++) {
    // .show is a method degined in the Cell function. It defines the size of a cell and renders it.
    grid[i].show();
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;

  this.show = function () {
    let x = j*w;
    let y = i*w;

    // set booleans to control which lines are rendered. This will be turned off and on in the maze algorithm
    // Top Right Bottom Left
    this.walls = [true, true, true, true];

    stroke(255);
    // create all 4 walls of the grid using lines.
    // Top
    if (this.walls[0]) {
      line(x, y, x+w, y);
    }

    // Right
    if (this.walls[1]) {
      line(x+w, y, x+w, y+w);
    }

    // Bottom
    if (this.walls[2]) {
      line(x+w, y+w, x, y+w);
    }

    //Left
    if (this.walls[3]) {
      line(x, y+w, x, y);
    }
  }
}
