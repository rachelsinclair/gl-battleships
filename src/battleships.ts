export class Board {
    readonly columns: number = 10;
    readonly rows: number = 10;

    addShip(ship: Ship, coordinates: Coordinates) {
        if (coordinates.row < 0 || coordinates.column < 0) {
            return false;
        }
        return this.canPlaceShip(ship, coordinates);
    }

    canPlaceShip(ship: Ship, coordinates: Coordinates) {
        if (ship.orientation === Orientation.Horizontal) {
            return coordinates.row < this.rows && coordinates.column + ship.length <= this.columns;
        }
        else {
            return coordinates.column < this.columns && coordinates.row + ship.length <= this.rows;
        }
    }
}

export enum Orientation {
    Vertical,
    Horizontal
}

export class Ship {
    constructor(public readonly orientation: Orientation){}

    readonly length = 4;
}

interface Coordinates {
    row: number;
    column: number;
}