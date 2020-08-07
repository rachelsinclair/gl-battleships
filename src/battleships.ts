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

    private canPlaceShip(ship: Ship) : boolean {
        if (this.shipList.some(shipInList => ship.intersectsWith(shipInList))) {
            return false;
        }
        else {
            return ship.coordList.every(coord => this.isCoordOnBoard(coord));
        }
    }

    private isCoordOnBoard(coord: Coordinate) : boolean {
        return (coord.row >=0 && coord.row < this.rows) && (coord.column >= 0 && coord.column < this.columns);
    }
}

export enum Orientation {
    Vertical,
    Horizontal
}

export class Ship {
    constructor(public readonly orientation: Orientation, private firstCoordinate: Coordinate, private length : number){}
    readonly coordList : Coordinate[] = this.firstCoordinate.getRange(this.length, this.orientation);

    intersectsWith (otherShip: Ship) : boolean {
        return this.coordList.some(ship1Coord => otherShip.coordList.some(ship2Coord => ship1Coord.equalTo(ship2Coord)))
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