export class Board {
    constructor() {
        this.columns = 10;
        this.rows = 10;
        this.shipList = [];
        this.cellsTried = [];
    }
    addShip(ship) {
        if (!this.canPlaceShip(ship)) {
            return false;
        }
        this.shipList.push(ship);
        return true;
    }
    canPlaceShip(newShip) {
        return newShip.fitsOnBoard(this) && !this.shipList.some(existingShip => newShip.intersectsWith(existingShip));
    }
    isCoordOnBoard(coord) {
        return (coord.row >= 0 && coord.row < this.rows) && (coord.column >= 0 && coord.column < this.columns);
    }
    fireAt(coordinate) {
        let result = ShotResult.Miss;
        const hitShip = this.shipList.find(ship => ship.containsCoord(coordinate));
        if (hitShip) {
            result = hitShip.handleShot(coordinate);
        }
        this.cellsTried.push(coordinate);
        return result;
    }
    liveShipCount() {
        return this.shipList.filter(ship => !ship.isSunk()).length;
    }
    init() {
        this.shipList = [];
        this.cellsTried = [];
        const ships = [5, 4, 4];
        ships.forEach(ship => this.generateShip(ship));
        return;
    }
    generateShip(length) {
        for (let i = 0; i < 100; i++) {
            const orientation = randomInt(1);
            const startCoord = this.getValidStartCoordinate(orientation, length);
            const generatedShip = new Ship(orientation, startCoord, length);
            if (this.addShip(generatedShip))
                return;
        }
        throw new Error("Unable to place ship");
    }
    getValidStartCoordinate(orientation, length) {
        if (orientation === Orientation.Horizontal) {
            return new Coordinate(randomInt(this.rows - 1), randomInt(this.columns - length));
        }
        else {
            return new Coordinate(randomInt(this.rows - length), randomInt(this.columns - 1));
        }
    }
    hasAlreadyBeenTried(coordinate) {
        return this.cellsTried.some(cell => cell.equalTo(coordinate));
    }
}
function randomInt(maxValue) {
    return Math.floor(Math.random() * (maxValue + 1));
}
export var ShotResult;
(function (ShotResult) {
    ShotResult[ShotResult["Hit"] = 0] = "Hit";
    ShotResult[ShotResult["Miss"] = 1] = "Miss";
    ShotResult[ShotResult["Sink"] = 2] = "Sink";
})(ShotResult || (ShotResult = {}));
export var Orientation;
(function (Orientation) {
    Orientation[Orientation["Vertical"] = 0] = "Vertical";
    Orientation[Orientation["Horizontal"] = 1] = "Horizontal";
})(Orientation || (Orientation = {}));
export class Ship {
    constructor(orientation, firstCoordinate, length) {
        this.orientation = orientation;
        this.firstCoordinate = firstCoordinate;
        this.length = length;
        this.status = this.firstCoordinate.getRange(this.length, this.orientation).map(coord => { return { coordinate: coord, hit: false }; });
    }
    intersectsWith(otherShip) {
        return this.status.some(square => otherShip.containsCoord(square.coordinate));
    }
    fitsOnBoard(board) {
        return this.status.every(square => board.isCoordOnBoard(square.coordinate));
    }
    containsCoord(coordToCheck) {
        return this.status.some(square => square.coordinate.equalTo(coordToCheck));
    }
    handleShot(coord) {
        const target = this.status.find(square => square.coordinate.equalTo(coord));
        if (!target) {
            return ShotResult.Miss;
        }
        if (target.hit) {
            return ShotResult.Miss;
        }
        else {
            target.hit = true;
            if (this.isSunk()) {
                return ShotResult.Sink;
            }
            return ShotResult.Hit;
        }
    }
    isSunk() {
        return this.status.every(square => square.hit);
    }
}
export class Coordinate {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
    equalTo(coord) {
        return (this.row === coord.row) && (this.column === coord.column);
    }
    getNext(direction) {
        if (direction === Orientation.Vertical) {
            return new Coordinate(this.row + 1, this.column);
        }
        else {
            return new Coordinate(this.row, this.column + 1);
        }
    }
    getRange(length, orientation) {
        const range = [];
        let currentCoordinate = this;
        for (let i = 0; i < length; i++) {
            range.push(currentCoordinate);
            currentCoordinate = currentCoordinate.getNext(orientation);
        }
        return range;
    }
}
//# sourceMappingURL=battleships.js.map