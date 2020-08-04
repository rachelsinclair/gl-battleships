export class Board {
    readonly columns: number = 10;
    readonly rows: number = 10;
    private shipList: Ship[] = [];

    addShip(ship: Ship) {
        if (!this.canPlaceShip(ship)) {
            return false;
        }
        this.shipList.push(ship);
        return true;
    }

    private canPlaceShip(ship: Ship) {
        if (this.shipList.some(shipInList => ship.intersectsWith(shipInList))) {
            return false;
        }
        if (ship.coordinates.row < 0 || ship.coordinates.column < 0) {
            return false;
        }
        if (ship.orientation === Orientation.Horizontal) {
            return ship.coordinates.row < this.rows && ship.coordinates.column + ship.length <= this.columns;
        }
        else {
            return ship.coordinates.column < this.columns && ship.coordinates.row + ship.length <= this.rows;
        }
    }
}

export enum Orientation {
    Vertical,
    Horizontal
}

export class Ship {
    constructor(public readonly orientation: Orientation, public readonly coordinates: Coordinates){}
    readonly length = 4;

    intersectsWith (otherShip: Ship) {
        if (this.coordinates.row === otherShip.coordinates.row && this.coordinates.column === otherShip.coordinates.column) {
            return true;
        }
    }
}

interface Coordinates {
    row: number;
    column: number;
}