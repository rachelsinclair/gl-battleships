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

    private isCoordOnBoard(coord: Coordinate) : boolean {
        return (coord.row >=0 && coord.row < this.rows) && (coord.column >= 0 && coord.column < this.columns);
    }
}

export enum Orientation {
    Vertical,
    Horizontal
}

export class Ship {
    constructor(public readonly orientation: Orientation, public readonly firstCoordinate: Coordinate){}
    readonly length = 4;

    intersectsWith (otherShip: Ship) : boolean {
        return this.getAllCoords().some(ship1Coord => otherShip.getAllCoords().some(ship2Coord => ship1Coord.equalTo(ship2Coord)))
    }

    getAllCoords() : Coordinate[] {
        const coordList : Coordinate[] = [];
        let currentCoordinate : Coordinate = this.firstCoordinate;
        for (let i = 0; i < this.length; i++) {
            coordList.push(currentCoordinate);
            currentCoordinate = currentCoordinate.getNextCoordinate(this.orientation);
        }
        return coordList;
    }
}

export class Coordinate {
    constructor(public readonly row: number, public readonly column: number){
        
    }

    equalTo(coord: Coordinate) : boolean {
        return (this.row === coord.row) && (this.column === coord.column);
    }

    getNextCoordinate(direction : Orientation) : Coordinate {
        if (direction === Orientation.Vertical) {
            return new Coordinate(this.row+1,this.column);
        }
        else {
            return new Coordinate(this.row,this.column + 1);
        }
    }
}