import { Board, Coordinate, ShotResult } from "./battleships.js";
var CellState;
(function (CellState) {
    CellState[CellState["Hidden"] = 0] = "Hidden";
    CellState[CellState["Empty"] = 1] = "Empty";
    CellState[CellState["Hit"] = 2] = "Hit";
})(CellState || (CellState = {}));
class Grid {
    constructor() {
        this.margin = { vertical: 60, horizontal: 60 };
        this.cellSize = 40;
        this.cellSpacing = 1;
        this.gameBoard = new Board;
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.gameBoard.rows; i++) {
            for (let j = 0; j < this.gameBoard.columns; j++) {
                drawCell(new Coordinate(i, j), CellState.Hidden);
            }
        }
        ctx.font = '30px sans-serif';
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
    updateMessage(msg) {
        ctx.font = '20px sans-serif';
        ctx.textAlign = "start";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";
        ctx.clearRect(500, 100, 150, 60);
        msg.split("\n").map((line, idx) => ctx.fillText(line, 500, 100 + idx * 25, 150));
    }
}
function win() {
    grid.updateMessage("You win! 🎉🎉🎉");
    canvas.removeEventListener("click", handleClick, true);
    button.style.display = "inline-block";
}
function drawCell(coord, state) {
    switch (state) {
        case CellState.Hidden:
            ctx.fillStyle = "lightgrey";
            ctx.strokeStyle = 'darkgrey';
            break;
        case CellState.Empty:
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = 'darkgrey';
            break;
        case CellState.Hit:
            ctx.fillStyle = "red";
            ctx.strokeStyle = 'yellow';
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
function handleClick(e) {
    const canvasPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
    const clickedCoordinate = getCoordFromCanvasPos(canvasPos.x, canvasPos.y);
    if (grid.gameBoard.isCoordOnBoard(clickedCoordinate) && !grid.gameBoard.hasAlreadyBeenTried(clickedCoordinate)) {
        const result = grid.gameBoard.fireAt(clickedCoordinate);
        if (result === ShotResult.Miss) {
            drawCell(clickedCoordinate, CellState.Empty);
            grid.updateMessage("Missed.");
        }
        else if (result === ShotResult.Hit) {
            drawCell(clickedCoordinate, CellState.Hit);
            grid.updateMessage("Hit!");
        }
        else if (result === ShotResult.Sink) {
            drawCell(clickedCoordinate, CellState.Hit);
            grid.updateMessage("Hit!\nYou sunk a ship!");
            if (grid.gameBoard.liveShipCount() === 0) {
                win();
            }
        }
    }
}
function getCoordFromCanvasPos(x, y) {
    const row = Math.floor((y - grid.margin.vertical) / (grid.cellSize + grid.cellSpacing));
    const column = Math.floor((x - grid.margin.horizontal) / (grid.cellSize + grid.cellSpacing));
    return new Coordinate(row, column);
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();
const grid = new Grid;
const button = document.getElementById("replay");
button.addEventListener("click", () => {
    button.style.display = "none";
    playGame();
});
playGame();
function playGame() {
    canvas.addEventListener("click", handleClick, true);
    grid.gameBoard.init();
    grid.draw();
}
//# sourceMappingURL=main.js.map