// Depth first search, with recursive backtracker

// GLOB VARIABLES //////////////////////////////////////////////////////////////
let cols, rows;
// the width of the cells
let w = 10;
let grid = [];
let current;
// create a histtory of moves for the recursive backtracking
let stack = [];
let highlighted = [];

// SETUP ////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(400, 440);
  cols = floor(width/w);
  rows = floor(height/w);
  // Slows doen the maze. comment out for full speed.
  frameRate(30);

  // loop through all the rows, and all the cells to fill the grid array with cells.
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  // assign the starting square.
  current = grid[0];
}


// DRAW ////////////////////////////////////////////////////////////////////////
function draw() {
  background(10);

  for (let i = 0; i < grid.length; i++) {
    // .show is a method degined in the Cell function. It defines the size of a cell and renders it.
    grid[i].show();
  }

  current.visited = true;
  current.highlight(1);
  if (highlighted.length > 1) {
    highlighted[highlighted.length - 1].highlight(2);
  }
  if (highlighted.length > 2) {
    highlighted[highlighted.length - 2].highlight(3);
  }
  if (highlighted.length > 3) {
    highlighted[highlighted.length - 3].highlight(4);
  }
  if (highlighted.length > 4) {
    highlighted[highlighted.length - 4].highlight(5);
  }
  if (highlighted.length > 5) {
    highlighted[highlighted.length - 5].highlight(6);
  }
  if (highlighted.length > 6) {
    highlighted[highlighted.length - 6].highlight(7);
  }
  if (highlighted.length > 7) {
    highlighted[highlighted.length - 7].highlight(8);
  }
  if (highlighted.length > 8) {
    highlighted[highlighted.length - 8].highlight(9);
  }
  if (highlighted.length > 9) {
    highlighted[highlighted.length - 9].highlight(10);
  }
  if (highlighted.length > 10) {
    highlighted[highlighted.length - 10].highlight(11);
  }

  // STEP 1
  let next = current.checkNeighbours();
  highlighted.push(current);
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  }
  else if (stack.length > 0) {
    // remove the last item from the stack, and assign this as current to move back a spot
    // this enables the current to backtrack until there is a valid neighbour, in which it will move forward as normal.
    current = stack.pop();
  }
}

function index (i, j) {
  // check if the request is outside of the grid, if it is return a negatrive number which will cause an error in Cell.checkNeighbours
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}


// CELL ////////////////////////////////////////////////////////////////////////
function Cell(i, j) {
  this.i = i;
  this.j = j;
  // set booleans to control which lines are rendered. This will be turned off and on in the maze algorithm
  // Top Right Bottom Left
  this.walls = [true, true, true, true];
  // visited is assigned through the draw function.
  this.visited = false;


    this.checkNeighbours = function() {
      let neighbours = [];

      // define the location of the neighbouring elements in the array
      let top = grid[index(i, j-1)];
      let right = grid[index(i+1, j)];
      let bottom = grid[index(i, j+1)];
      let left = grid[index(i-1, j)];

      // check if the index exists, and hasnt been visited already. If so then push it into the array
      if (top && !top.visited) {
        neighbours.push(top);
      }

      if (right && !right.visited) {
        neighbours.push(right);
      }

      if (bottom && !bottom.visited) {
        neighbours.push(bottom);
      }

      if (left && !left.visited) {
        neighbours.push(left);
      }

      // Check the array has recieved numbers, if it has then pick a random neighbour.
      if (neighbours.length > 0) {
        let r = floor(random(0, neighbours.length));
        return neighbours[r];
      }
      else {
        return undefined;
      }

    }

    this.show = function () {
      let x = i*w;
      let y = j*w;

      stroke(0);
      strokeWeight(1);
      // create al1 4 walls of the grid using lines.
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

      // if this cell has been visited (assigned in draw), then render a different colour.
      if (this.visited) {
        noStroke();
        fill(50, 50, 50);
        rect(x, y, w, w);
      }
  }

  this.highlight = function (n) {
    // create a square with a new colour to render over the current cell (this is called in the draw function)
    // x is the top most corner to draw the square from. Find the row # and then multiply that by the width to find the location in units.
    let x = this.i*w;
    let y = this.j*w;
    noStroke();
    if (n === 1) {
      // fill("#95d3ff");
      fill('rgba(149, 211, 255, 1)');
    }
    if (n === 2) {
      // fill('#58e8ff');
      fill('rgba(88, 232, 255, 0.8)');
    }
    if (n === 3) {
      // fill('#58ffd8');
      fill('rgba(88, 255, 216, 0.7)');
    }
    if (n === 4) {
      // fill('#58ff7c');
      fill('rgba(88, 255, 124, 0.7)');
    }
    if (n === 5) {
      // fill('#c6ff58');
      fill('rgba(198, 255, 88, 0.6)');
    }
    if (n === 6) {
      // fill('#ffc458');
      fill('rgba(255, 196, 88, 0.6)');
    }
    if (n === 7) {
      // fill('#ff827c');
      fill('rgba(255, 130, 134, 0.5)');
    }
    if (n === 8) {
      // fill('#ff7cc5');
      fill('rgba(255, 124, 197, 0.4)');
    }
    if (n === 9) {
      // fill('#ff7cf5');
      fill('rgba(255, 124, 255, 0.3)');
    }
    if (n === 10) {
      // fill('#c17cff');
      fill('rgba(193, 125, 255, 0.2)');
    }
    if (n === 11) {
      // fill('#857cff');
      fill('rgba(133, 125, 255, 0.1)');
    }

    rect(x+1, y+1, w-2, w-2);
  }
}

// REMOVEWALLS /////////////////////////////////////////////////////////////////
function removeWalls(a, b) {
  // To remove the walls, we find the location of the walls.
  // If this formula returns 1, then remove the bottom wall of a, and the top wall of b.
  let x = a.i - b.i;

  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }
  // If this formula returns negative 1, then remove the top wall of a, and the bottom wall of b.
  else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  // If this formula returns 1, then remove the left wall of a, and the right wall of b.
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }
  // If this formula returns negative 1, then remove the right wall of a, and the left wall of b.ß
  else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }

}
