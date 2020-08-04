import { describe } from "mocha";
import { expect } from "chai";
import { Board, Ship, Orientation } from "./battleships";

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
                const testShip = new Ship(Orientation.Horizontal)
                expect(testBoard.addShip(testShip, {row: 0, column: 0})).to.be.true;
            })
            it("should return false when attempting to place ship on a row that is too large", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal)
                expect(testBoard.addShip(testShip, {row: 99, column: 0})).to.be.false;
            })
            it("should return false when attempting to place ship on a row that is too small", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal)
                expect(testBoard.addShip(testShip, {row: -99, column: 0})).to.be.false;
            })
            it("should return false when attempting to place ship out of bounds (horizontal)", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal)
                expect(testBoard.addShip(testShip, {row: 99, column: 0})).to.be.false;
            })
            it("should allow us to place horizontal ship right up to the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal)
                expect(testBoard.addShip(testShip, {row: 0, column: 6})).to.be.true;
            })
            it("should not allow horizontal ship to go just over the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Horizontal)
                expect(testBoard.addShip(testShip, {row: 0, column: 7})).to.be.false;
            })
            it("should allow us to place vertical ship right up to the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Vertical)
                expect(testBoard.addShip(testShip, {row: 6, column: 0})).to.be.true;
            })
            it("should not allow vertical ship to go just over the edge", function() {
                const testBoard = new Board();
                const testShip = new Ship(Orientation.Vertical)
                expect(testBoard.addShip(testShip, {row: 7, column: 0})).to.be.false;
            })
        })
    })
})

describe("Ship class", function(){
    describe("Ship constructor", function(){
        const testShip = new Ship(Orientation.Horizontal);
        it("should create an instance of class Ship", function(){
            expect(testShip).to.be.instanceof(Ship);
        })

        it("should have a length property", function(){
            expect(testShip).to.have.property("length");
        })
    })
})