import { describe } from "mocha";
import { expect } from "chai";
import { Board, Ship, Orientation, Coordinate, ShotResult} from "./battleships";

describe("Board class", function() {
    describe("constructor function", function() {
        const testBoard = new Board();
        it("should create an instance of Board class", function() {
            expect(testBoard).to.be.instanceof(Board);
        })
    
        it("should have 10 columns", function() {
            expect(testBoard.columns).to.equal(10);
        })
    
        it("should have 10 rows", function() {
            expect(testBoard.rows).to.equal(10);
        })

    })

    describe("addShip function", function() {
        it ("should be a valid function", function() {
            expect(Board.prototype.addShip).to.exist;
        })
        describe("adding ship to empty board",function() {
            it("should return true when added successfully", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 4);
                expect(testBoard.addShip(testShip)).to.be.true;
            })
            it("should return false when attempting to place ship on a row that is too large", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinate(99, 0), 4);
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            it("should return false when attempting to place ship on a row that is too small", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinate(-99, 0), 4);
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            it("should return false when attempting to place ship out of bounds (horizontal)", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinate(99, 0), 4);
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            it("should allow us to place horizontal ship right up to the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 6), 4);
                expect(testBoard.addShip(testShip)).to.be.true;
            })
            it("should not allow horizontal ship to go just over the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 7), 4);
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            it("should allow us to place vertical ship right up to the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Vertical, new Coordinate(6, 0), 4);
                expect(testBoard.addShip(testShip)).to.be.true;
            })
            it("should not allow vertical ship to go just over the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Vertical, new Coordinate(7, 0), 4);
                expect(testBoard.addShip(testShip)).to.be.false;
            })
        })
        describe("adding a second ship to the board", function () {
            it("should fail if you try to place a second ship on the same coordinate as the first", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 4);
                expect(testBoard.addShip(testShip)).to.be.true;
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            describe("both ships horizontal", function () {
                it("should pass if you try to place the second ship in another row", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Horizontal, new Coordinate(1, 0), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })                          
                it("should fail if you try to place the second ship on the same row and overlapping the first", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Horizontal, new Coordinate(0, 1), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.false;
                })
                it("should pass if you try to place the second ship on the same row but not overlapping the first", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Horizontal, new Coordinate(0, 4), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })                          
            })
            describe("both ships vertical", function () {
                it("should pass if you try to place the second ship in a different column", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Vertical, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinate(0, 1), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
                it("should fail if you try to place the second ship on the same column and overlapping the first", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Vertical, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinate(1, 0), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.false;
                })
                it("should pass if you try to place the second ship on the same column but not overlapping the first", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Vertical, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinate(4, 0), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
            })
            describe("one ship horizontal and one ship vertical", function () {
                it("should pass if the two ships are not touching", function () {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinate(0, 9), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
                it("should pass if the horizontal ship touches the vertical ship", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Vertical, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Horizontal, new Coordinate(0, 1), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
                it("should pass if the vertical ship touches the horizontal ship", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinate(1, 0), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
                it("should fail if the both ships intersect", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 4);
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinate(0, 2), 4);
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.false;
                })
            })
        })     
    })
    describe("fireAt function", function() {
        it("should return a miss for an empty coordinate", function() {
            expect(new Board().fireAt(new Coordinate(0,0))).to.equal(ShotResult.Miss);
        })
        it("should register a hit when fired at a coordinate containing a ship", function() {
            for (let i = 0; i < 4; i++) {
                const testBoard = new Board();
                testBoard.addShip(new Ship(Orientation.Horizontal, new Coordinate(0,0), 4));
                expect(testBoard.fireAt(new Coordinate(0,i))).to.equal(ShotResult.Hit);
            }
        })        
        it("should check all ships for a hit", function() {
            const testBoard = new Board();
            testBoard.addShip(new Ship(Orientation.Horizontal, new Coordinate(0,0), 4));
            testBoard.addShip(new Ship(Orientation.Horizontal, new Coordinate(1,0), 4));
            testBoard.addShip(new Ship(Orientation.Horizontal, new Coordinate(2,0), 4));
            testBoard.addShip(new Ship(Orientation.Horizontal, new Coordinate(3,0), 4));
            expect(testBoard.fireAt(new Coordinate(0,0))).to.equal(ShotResult.Hit);
            expect(testBoard.fireAt(new Coordinate(1,1))).to.equal(ShotResult.Hit);
            expect(testBoard.fireAt(new Coordinate(2,2))).to.equal(ShotResult.Hit);
            expect(testBoard.fireAt(new Coordinate(3,3))).to.equal(ShotResult.Hit);
        })
        it.skip("should register a sink when hitting the last surviving square of a ship", function() {
            const testBoard = new Board();
            testBoard.addShip(new Ship(Orientation.Horizontal, new Coordinate(0,0), 4));
            expect(testBoard.fireAt(new Coordinate(0,0))).to.equal(ShotResult.Hit);
            expect(testBoard.fireAt(new Coordinate(0,1))).to.equal(ShotResult.Hit);
            expect(testBoard.fireAt(new Coordinate(0,2))).to.equal(ShotResult.Hit);
            expect(testBoard.fireAt(new Coordinate(0,3))).to.equal(ShotResult.Sink);
        })
    })
})

describe("Ship class", function(){
    describe("Ship constructor", function(){
        const testShip = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 4);
        const testShip2 = new Ship(Orientation.Horizontal, new Coordinate(0, 0), 5);
        it("should create an instance of class Ship", function(){
            expect(testShip).to.be.instanceof(Ship);
        })

        it("should use length parameter to create an appropriately sized ship", function(){
            expect(testShip.coordList).to.have.length(4);
            expect(testShip2.coordList).to.have.length(5);
        })
    })
})

describe("Coordinate class", function() {
    describe("equalTo function", function() {
        it("should return true when checking a set of coordinates against itself", function() {
           const testCoordinates = new Coordinate(1, 2);
           expect(testCoordinates.equalTo(testCoordinates)).to.be.true;
        })

        it("should return true when two Coordinates match both row and column", function() {
            const testCoordinates = new Coordinate(1, 2);
            const testCoordinates2 = new Coordinate(1, 2);
            expect(testCoordinates.equalTo(testCoordinates2)).to.be.true;
        })

         it("should return false when two Coordinates only have matching row", function() {
            const testCoordinates = new Coordinate(1, 2);
            const testCoordinates2 = new Coordinate(1, 3);
            expect(testCoordinates.equalTo(testCoordinates2)).to.be.false;
        })

         it("should return false when two Coordinates only have matching column", function() {
            const testCoordinates = new Coordinate(1, 2);
            const testCoordinates2 = new Coordinate(0, 2);
            expect(testCoordinates.equalTo(testCoordinates2)).to.be.false;
        })
    })
    describe("getNext function", function() {
        it("should return a Coordinate", function () {
            expect(new Coordinate(0,0).getNext(Orientation.Vertical)).to.be.instanceOf(Coordinate);
        })
        it("should return next vertical Coordinate", function () {
            expect(new Coordinate(0,0).getNext(Orientation.Vertical)).to.deep.equal(new Coordinate(1,0));
        })
        it("should return next horizontal coordinate", function() {
            expect(new Coordinate(0,0).getNext(Orientation.Horizontal)).to.deep.equal(new Coordinate(0,1));
        })
        it("should be able to chain the function", function () {
            expect(new Coordinate(0,0).getNext(Orientation.Vertical).getNext(Orientation.Vertical)).to.deep.equal(new Coordinate(2,0));
        })
        it("should be commutative (if it is applied twice, the order it is applied in should not matter)", function() {
            const verticalThenHorizontal = new Coordinate(0,0).getNext(Orientation.Vertical).getNext(Orientation.Horizontal);
            const horizontalThenVertical = new Coordinate(0,0).getNext(Orientation.Horizontal).getNext(Orientation.Vertical);
            expect(verticalThenHorizontal).to.deep.equal(horizontalThenVertical);
        })
    })

    describe("getRange function", function() {
        it("should return an array", function () {
            expect(new Coordinate(0, 0).getRange(1, Orientation.Horizontal)).to.be.instanceOf(Array);
        })
        it("should return an array of coordinates", function () {
            expect(new Coordinate(0, 0).getRange(1, Orientation.Horizontal).every(item => item instanceof Coordinate)).to.be.true;
        })
        it("should return an array with a length provided by a parameter", function () {
            expect(new Coordinate(0, 0).getRange(0, Orientation.Horizontal)).to.be.empty;
            expect(new Coordinate(0, 0).getRange(1, Orientation.Horizontal)).to.have.lengthOf(1);
            expect(new Coordinate(0, 0).getRange(2, Orientation.Horizontal)).to.have.lengthOf(2);
        })
        it("should return the original coordinate for length 1", function () {
            expect(new Coordinate(0, 0).getRange(1, Orientation.Horizontal)).to.deep.equal([new Coordinate(0, 0)]);
            expect(new Coordinate(1, 1).getRange(1, Orientation.Horizontal)).to.deep.equal([new Coordinate(1, 1)]);
        })
        it("should return the next n coordinates horizontally when specified", function () {
            expect(new Coordinate(0, 0).getRange(2, Orientation.Horizontal)).to.deep.equal([new Coordinate(0, 0), new Coordinate(0,1)]);
            expect(new Coordinate(0, 0).getRange(3, Orientation.Horizontal)).to.deep.equal([new Coordinate(0, 0), new Coordinate(0,1), new Coordinate(0,2)]);
        })

        it("should return the next n coordinates vertically when specified", function () {
            expect(new Coordinate(0, 0).getRange(2, Orientation.Vertical)).to.deep.equal([new Coordinate(0, 0), new Coordinate(1,0)]);
            expect(new Coordinate(0, 0).getRange(3, Orientation.Vertical)).to.deep.equal([new Coordinate(0, 0), new Coordinate(1,0), new Coordinate(2,0)]);
        })
    })
})