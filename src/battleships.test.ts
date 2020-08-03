import { describe } from "mocha";
import { expect } from "chai";
import { board } from "./battleships";

describe("Board object", function() {
    it("should be an object", function() {
        expect(board).to.be.instanceof(Object);
    })

    it("should have 10 columns", function() {
        expect(board.columns).to.equal(10);
    })

    it("should have 10 rows", function() {
        expect(board.rows).to.equal(10);
    })
})