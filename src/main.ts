import { Board, Coordinate, ShotResult } from "./battleships.js";

enum CellState {
  Hidden,
  Empty,
  Hit
}

class Grid {
  margin = {vertical: 60, horizontal: 60};
  cellSize = 40;
  cellSpacing = 1;
  gameBoard = new Board;

  drawGrid() {
    clearCanvas();
    this.drawAllCells();
    this.drawHeadings();
  }

  private drawAllCells() {
    for (let i = 0; i < this.gameBoard.rows; i++) {
      for (let j = 0; j < this.gameBoard.columns; j++) {
        drawCell(new Coordinate(i, j), CellState.Hidden);
      }
    }
  }

  private drawHeadings() {
    ctx.font = "30px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    for (let i = 0; i < this.gameBoard.columns; i++) {
      ctx.fillText(String.fromCharCode(65 + i), i * (this.cellSize + this.cellSpacing) + this.margin.horizontal + this.cellSize / 2, this.margin.vertical - 20);
    }
    for (let i = 0; i < this.gameBoard.rows; i++) {
      ctx.fillText(i.toString(), this.margin.horizontal - 30, i * (this.cellSize + this.cellSpacing) + this.margin.vertical + this.cellSize / 2);
    }
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateMessage(msg : string) {
  ctx.font = "20px sans-serif";
  ctx.textAlign = "start";
  ctx.textBaseline = "top";
  ctx.fillStyle = "black";
  ctx.clearRect(500, 100, 150, 60);
  const lineHeight = 25;
  msg.split("\n").map((line,idx) => ctx.fillText(line, 500, 100 + (idx*lineHeight), 150));
}

function playGame() {
  canvas.addEventListener("click", handleClick, true);
  grid.gameBoard.init();
  grid.drawGrid();
}

function win() {
  updateMessage("You win! 🎉🎉🎉");
  canvas.removeEventListener("click", handleClick, true);
  button.style.display = "inline-block";
}

function drawCell (coord : Coordinate, state : CellState) {
  switch (state) {
    case CellState.Hidden:
      ctx.fillStyle = "lightgrey";
      ctx.strokeStyle = "darkgrey";
      break;
    case CellState.Empty:
      ctx.fillStyle = "transparent";
      ctx.strokeStyle = "darkgrey";
      break;
    case CellState.Hit:
      ctx.fillStyle = "red";
      ctx.strokeStyle = "yellow";
      break;
    }
  ctx.beginPath();
  ctx.lineWidth = 1;
  const leftPos = coord.column * (grid.cellSize + grid.cellSpacing) + grid.margin.horizontal;
  const topPos = coord.row * (grid.cellSize + grid.cellSpacing) + grid.margin.vertical;
  ctx.clearRect(leftPos, topPos, grid.cellSize, grid.cellSize);
  ctx.rect(leftPos, topPos, grid.cellSize, grid.cellSize);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function handleClick (e : MouseEvent) {
    const canvasPos = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
  const clickedCoordinate = getCoordFromCanvasPos(canvasPos.x, canvasPos.y);
  if (grid.gameBoard.isValidCoord(clickedCoordinate) && !grid.gameBoard.hasAlreadyBeenTried(clickedCoordinate)) {
    const result = grid.gameBoard.fireAt(clickedCoordinate);
    if(result === ShotResult.Miss) {
      drawCell(clickedCoordinate, CellState.Empty);
      updateMessage("Missed.");
    }
    else if (result === ShotResult.Hit) {
      drawCell(clickedCoordinate, CellState.Hit);
      updateMessage("Hit!");
    }
    else if (result === ShotResult.Sink) {
      drawCell(clickedCoordinate, CellState.Hit);
      updateMessage("Hit!\nYou sunk a ship!");
      if (grid.gameBoard.liveShipCount() === 0) {
        win();
      }
    }
  }
}

function getCoordFromCanvasPos(x : number, y : number) : Coordinate {
  const row = Math.floor((y - grid.margin.vertical)/(grid.cellSize + grid.cellSpacing));
  const column = Math.floor((x - grid.margin.horizontal)/(grid.cellSize + grid.cellSpacing));
  return new Coordinate(row, column);
}

const canvas = <HTMLCanvasElement> document.getElementById("canvas")
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();
const grid = new Grid;
const button = <HTMLButtonElement> document.getElementById("replay");
button.addEventListener("click",()=>{
  button.style.display = "none";
  playGame();
})

playGame();
