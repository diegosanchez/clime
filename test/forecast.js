const chai = require("chai");

const Forecast = require("../model/forecast");

describe("forecast", () => {

    describe("dry", () => {
        it("should be like this on 0, 90, 180)", () => {
            [0, 90, 180, 270, 360, 450].forEach( (d) => {
                const value = Forecast.clime(0);
                delete value.metadata;
                chai.expect(value).to.deep.equal({
                    dia: 0,
                    clima: "sequia"
                });
            });
        });

        it("shouldn't be like this on 0, 90, 180)", () => {
            [10, 100, 190, 280, 3700, 409].forEach( (d) => {
                const value = Forecast.clime(0);
                delete value.metadata;
                chai.expect(value).to.deep.equal({
                    dia: 0,
                    clima: "sequia"
                });
            });
        });
    });
});
