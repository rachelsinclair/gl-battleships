import { describe } from "mocha";
import { expect } from "chai";
import { battleship } from "./battleship";

describe("Battleship game", function() {
    it("should run", function() {
        expect(battleship()).to.be.undefined;
    })
})