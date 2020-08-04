export class Board {
    readonly columns: number = 10;
    readonly rows: number = 10;

    numberOfShips: number = 0;

    addShip() {
        this.numberOfShips += 1;
    }
}

export class Ship {
    readonly length = 0;
}