import { describe } from "mocha";
import { expect } from "chai";
import { Board, Ship, Orientation, Coordinates } from "./battleships";

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
                const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 0))
                expect(testBoard.addShip(testShip)).to.be.true;
            })
            it("should return false when attempting to place ship on a row that is too large", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinates(99, 0))
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            it("should return false when attempting to place ship on a row that is too small", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinates(-99, 0))
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            it("should return false when attempting to place ship out of bounds (horizontal)", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinates(99, 0))
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            it("should allow us to place horizontal ship right up to the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 6))
                expect(testBoard.addShip(testShip)).to.be.true;
            })
            it("should not allow horizontal ship to go just over the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 7))
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            it("should allow us to place vertical ship right up to the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Vertical, new Coordinates(6, 0))
                expect(testBoard.addShip(testShip)).to.be.true;
            })
            it("should not allow vertical ship to go just over the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Vertical, new Coordinates(7, 0))
                expect(testBoard.addShip(testShip)).to.be.false;
            })
        })
        describe("adding a second ship to the board", function () {
            it("should fail if you try to place a second ship on the same coordinate as the first", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 0));
                expect(testBoard.addShip(testShip)).to.be.true;
                expect(testBoard.addShip(testShip)).to.be.false;
            })
            describe("both ships horizontal", function () {
                it("should pass if you try to place the second ship in another row", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Horizontal, new Coordinates(1, 0));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })                          
                it("should fail if you try to place the second ship on the same row and overlapping the first", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Horizontal, new Coordinates(0, 1));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.false;
                })
                it("should pass if you try to place the second ship on the same row but not overlapping the first", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Horizontal, new Coordinates(0, 4));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })                          
            })
            describe("both ships vertical", function () {
                it("should pass if you try to place the second ship in a different column", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Vertical, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinates(0, 1));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
                it("should fail if you try to place the second ship on the same column and overlapping the first", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Vertical, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinates(1, 0));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.false;
                })
                it("should pass if you try to place the second ship on the same column but not overlapping the first", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Vertical, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinates(4, 0));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
            })
            describe("one ship horizontal and one ship vertical", function () {
                it("should pass if the two ships are not touching", function () {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinates(0, 9));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
                it("should pass if the horizontal ship touches the vertical ship", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Vertical, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Horizontal, new Coordinates(0, 1));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
                it("should pass if the vertical ship touches the horizontal ship", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinates(1, 0));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.true;
                })
                it("should fail if the both ships intersect", function() {
                    const testBoard = new Board();
                    const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 0));
                    const testShip2 = new Ship(Orientation.Vertical, new Coordinates(0, 2));
                    expect(testBoard.addShip(testShip)).to.be.true;
                    expect(testBoard.addShip(testShip2)).to.be.false;
                })
            })
        })     
    })
})

describe("Ship class", function(){
    describe("Ship constructor", function(){
        const testShip = new Ship(Orientation.Horizontal, new Coordinates(0, 0));
        it("should create an instance of class Ship", function(){
            expect(testShip).to.be.instanceof(Ship);
        })

        it("should have a length property", function(){
            expect(testShip).to.have.property("length");
        })
    })
})