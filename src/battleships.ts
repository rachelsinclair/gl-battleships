function randomInt (maxValue : number) {
    return Math.floor(Math.random() * (maxValue + 1));
}

export enum ShotResult {
    Hit,
    Miss,
    Sink
}

export enum Orientation {
    Vertical,
    Horizontal
}

export class Board {
    readonly columns: number = 10;
    readonly rows: number = 10;
    private shipList: Ship[] = [];
    private cellsTried: Coordinate[] = [];

    addShip(ship: Ship) : boolean {
        if (!this.canPlaceShip(ship)) {
            return false;
        }
        this.shipList.push(ship);
        return true;
    }

    private canPlaceShip(newShip: Ship) : boolean {
        return newShip.fitsOnBoard(this) && !this.shipList.some(existingShip => newShip.intersectsWith(existingShip));
    }

    isValidCoord(coord: Coordinate) : boolean {
        return (coord.row >=0 && coord.row < this.rows) && (coord.column >= 0 && coord.column < this.columns);
    }

    fireAt(coordinate : Coordinate) : ShotResult {
        let result : ShotResult = ShotResult.Miss;
        const hitShip = this.shipList.find(ship => ship.containsCoord(coordinate));
        if (hitShip) {
            result = hitShip.handleShot(coordinate);
        }
        this.cellsTried.push(coordinate);
        return result;
    }

    liveShipCount() : number {
        return this.shipList.filter(ship => !ship.isSunk()).length;
    }

    init() : void {
        this.shipList = [];
        this.cellsTried = [];
        const ships = [5, 4, 4];
        ships.forEach(ship => this.generateShip(ship));
        return;
    }

    private generateShip(length : number) {
        for (let i = 0; i < 100; i++) {
            const orientation = randomInt(1) as Orientation;
            const startCoord = this.getValidStartCoordinate(orientation, length);
            const generatedShip = new Ship(orientation, startCoord, length);
            if (this.addShip(generatedShip)) return;
        }
        throw new Error("Unable to place ship");
    }

    private getValidStartCoordinate(orientation: Orientation, length: number) {
        if (orientation === Orientation.Horizontal) {
            return new Coordinate(randomInt(this.rows - 1), randomInt(this.columns - length));
        }
        else {
            return new Coordinate(randomInt(this.rows - length), randomInt(this.columns - 1));
        }
    }

    hasAlreadyBeenTried (coordinate : Coordinate) : boolean {
        return this.cellsTried.some(cell => cell.equalTo(coordinate));
    }
}



export class Ship {
    constructor(private orientation: Orientation, private firstCoordinate: Coordinate, private length : number){}
    private status = this.firstCoordinate.getRange(this.length, this.orientation).map(coord => {return {coordinate: coord, hit: false}});
 
    intersectsWith (otherShip: Ship) : boolean {
        return this.status.some(square => otherShip.containsCoord(square.coordinate));
    }

    fitsOnBoard (board : Board) : boolean {
        return this.status.every(square => board.isValidCoord(square.coordinate));
    }

    containsCoord (coordToCheck: Coordinate) : boolean {
        return this.status.some(square => square.coordinate.equalTo(coordToCheck));
    }

    handleShot (coord : Coordinate) : ShotResult {
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

    isSunk() : boolean {
        return this.status.every(square => square.hit);
    }

}

export class Coordinate {
    constructor(public readonly row: number, public readonly column: number){
    }

    equalTo(coord: Coordinate) : boolean {
        return (this.row === coord.row) && (this.column === coord.column);
    }

    getNext(direction : Orientation) : Coordinate {
        if (direction === Orientation.Vertical) {
            return new Coordinate(this.row+1,this.column);
        }
        else {
            return new Coordinate(this.row,this.column + 1);
        }
    }

    getRange(length : number, orientation : Orientation) : Coordinate[] {
        const range : Coordinate[] = [];
        let currentCoordinate = this as Coordinate;
        for (let i = 0; i < length; i++) {
            range.push(currentCoordinate);
            currentCoordinate = currentCoordinate.getNext(orientation);
        }
        return range;
    }
}