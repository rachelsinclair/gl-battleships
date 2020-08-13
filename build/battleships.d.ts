export declare class Board {
    readonly columns: number;
    readonly rows: number;
    private shipList;
    cellsTried: Coordinate[];
    addShip(ship: Ship): boolean;
    private canPlaceShip;
    isCoordOnBoard(coord: Coordinate): boolean;
    fireAt(coordinate: Coordinate): ShotResult;
    liveShipCount(): number;
    init(): void;
    private generateShip;
    private getValidStartCoordinate;
    hasAlreadyBeenTried(coordinate: Coordinate): boolean;
}
export declare enum ShotResult {
    Hit = 0,
    Miss = 1,
    Sink = 2
}
export declare enum Orientation {
    Vertical = 0,
    Horizontal = 1
}
export declare class Ship {
    private orientation;
    private firstCoordinate;
    private length;
    constructor(orientation: Orientation, firstCoordinate: Coordinate, length: number);
    private status;
    intersectsWith(otherShip: Ship): boolean;
    fitsOnBoard(board: Board): boolean;
    containsCoord(coordToCheck: Coordinate): boolean;
    handleShot(coord: Coordinate): ShotResult;
    isSunk(): boolean;
}
export declare class Coordinate {
    readonly row: number;
    readonly column: number;
    constructor(row: number, column: number);
    equalTo(coord: Coordinate): boolean;
    getNext(direction: Orientation): Coordinate;
    getRange(length: number, orientation: Orientation): Coordinate[];
}
//# sourceMappingURL=battleships.d.ts.map