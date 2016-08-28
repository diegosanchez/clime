const chai = require("chai");

const Forecast = require("../model/forecast");

describe("forecast", () => {

    describe("dry", () => {
        it("should be like this on 0, 90, 180)", () => {
            [0, 90, 180, 270, 360, 450].forEach( (d) => {
                const value = Forecast.clime(d);
                chai.expect(value).to.deep.equal({
                    dia: d,
                    clima: "sequia"
                });
            });
        });

        it("shouldn't be like this on 0, 90, 180)", () => {
            [10, 100, 190, 280, 3700, 409, 9].forEach( (d) => {
                const value = Forecast.clime(d);
                chai.expect(value).to.not.deep.equal({
                    dia: d,
                    clima: "sequia"
                });
            });
        });
    });

    describe("optimal presure", () => {
        it.skip("should ...", () => {
        });
    });

    describe("rain", () => {
        it("should be rainy and it's the peak", () => {
            [84, 96].forEach( (d) => {
                const value = Forecast.clime(d);
                chai.expect(value).to.deep.equal({
                    dia: d,
                    clima: "lluvia",
                    pico: true
                });
            });
        });

        it("should be rainy and it isn't the peak", () => {
            [101, 260, 259].forEach( (d) => {
                const value = Forecast.clime(d);
                chai.expect(value).to.deep.equal({
                    dia: d,
                    clima: "lluvia",
                    pico: false
                });
            });
        });

        it("shouldn't be rainy ", () => {
            const value = Forecast.clime(30);
            chai.expect(value.clima).to.not.equal("lluvia");
        });
    });
});
