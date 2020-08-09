export class Board {
    readonly columns: number = 10;
    readonly rows: number = 10;
    private shipList: Ship[] = [];

    addShip(ship: Ship) : boolean {
        if (!this.canPlaceShip(ship)) {
            return false;
        }
        this.shipList.push(ship);
        return true;
    }

    private canPlaceShip(newShip: Ship) : boolean {
        if (this.shipList.some(existingShip => newShip.intersectsWith(existingShip))) {
            return false;
        }
        else {
            return newShip.coordList.every(coord => this.isCoordOnBoard(coord));
        }
    }

    private isCoordOnBoard(coord: Coordinate) : boolean {
        return (coord.row >=0 && coord.row < this.rows) && (coord.column >= 0 && coord.column < this.columns);
    }

    fireAt(coordinate : Coordinate) {
        let result : ShotResult = ShotResult.Miss;
        const hitShip = this.shipList.find(ship => ship.containsCoord(coordinate));
        if (hitShip) {
            result = hitShip.handleShot(coordinate);
        }
        return result;
    }
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

export class Ship {
    constructor(public readonly orientation: Orientation, private firstCoordinate: Coordinate, private length : number){}
    private status = this.firstCoordinate.getRange(this.length, this.orientation).map(coord => {return {coordinate: coord, hit: false}});
    readonly coordList : Coordinate[] = this.status.map(square => square.coordinate);
 
    intersectsWith (otherShip: Ship) : boolean {
        return this.coordList.some(coord => otherShip.containsCoord(coord));
    }

    containsCoord (coordToCheck: Coordinate) : boolean {
        return this.coordList.some(coord => coord.equalTo(coordToCheck));
    }

    handleShot (coord : Coordinate) : ShotResult {
        const idx = this.status.findIndex(square => square.coordinate.equalTo(coord));
        if (this.status[idx].hit) {
            return ShotResult.Miss;
        }
        else {
            this.status[idx].hit = true;
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
        let range : Coordinate[] = [];
        let currentCoordinate = this as Coordinate;
        for (let i = 0; i < length; i++) {
            range.push(currentCoordinate);
            currentCoordinate = currentCoordinate.getNext(orientation);
        }
        return range;
    }
}