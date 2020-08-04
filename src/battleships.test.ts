import { describe } from "mocha";
import { expect } from "chai";
import { Board, Ship } from "./battleships";

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

        it("should have 0 ships initially", function() {
            expect(testBoard.numberOfShips).to.equal(0);
        })
    })

    describe("addShip function", function() {
        it ("should be a valid function", function() {
            expect(Board.prototype.addShip).to.exist;
        })
        describe("adding ship to empty board",function() {
            const testBoard = new Board();
            testBoard.addShip();
            it("should add 1 to the number of ships", function() {
                expect(testBoard.numberOfShips).to.equal(1);
            })
        })

    })
})

describe("Ship class", function(){
    describe("Ship constructor", function(){
        const testShip = new Ship();
        it("should create an instance of class Ship", function(){
            expect(testShip).to.be.instanceof(Ship);
        })

        it("should have a length property", function(){
            expect(testShip).to.have.property("length");
        })
    })
})