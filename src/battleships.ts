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
            return ship.getAllCoords().every(coord => this.isCoordOnBoard(coord));
        }
    }

    private isCoordOnBoard(coord: Coordinates) : boolean {
        return (coord.row >=0 && coord.row < this.rows) && (coord.column >= 0 && coord.column < this.columns);
    }
}

export enum Orientation {
    Vertical,
    Horizontal
}

export class Ship {
    constructor(public readonly orientation: Orientation, public readonly firstCoordinate: Coordinates){}
    readonly length = 4;

    intersectsWith (otherShip: Ship) : boolean {
        return this.getAllCoords().some(ship1Coord => otherShip.getAllCoords().some(ship2Coord => ship1Coord.equalTo(ship2Coord)))
    }

    getAllCoords() : Coordinates[] {
        if (this.orientation === Orientation.Horizontal) {
            return [...Array(this.length).keys()].map(i => new Coordinates(this.firstCoordinate.row, this.firstCoordinate.column + i));        
        }
        else {
            return [...Array(this.length).keys()].map(i => new Coordinates(this.firstCoordinate.row + i, this.firstCoordinate.column));        
        }
    }
}

export class Coordinates {
    constructor(public readonly row: number, public readonly column: number){
        
    }

    equalTo(coord: Coordinates) : boolean {
        return (this.row === coord.row) && (this.column === coord.column);
    }

    getNextCoordinate(direction : Orientation) : Coordinates {
        if (direction === Orientation.Vertical) {
            return new Coordinates(this.row+1,this.column);
        }
        else {
            return new Coordinates(this.row,this.column + 1);
        }
    }
}