const Sylvester = require("sylvester");

const Planets = {
    planets: {
        ferengi: {
            orbitRadio: 500,
            speed: 1.0
        },
        betasoide: {
            orbitRadio: 2000,
            speed: 3.0
        },
        vulcano: {
            orbitRadio: 1000,
            speed: -5.0
        }
    },

    where: function(planetName, day) {
        const planet = this.planets[planetName];
        return {
            x: planet.orbitRadio * Math.round( Math.cos( planet.speed * day * Math.PI / 180.0 ) ),
            y: planet.orbitRadio * Math.round( Math.sin( planet.speed * day * Math.PI / 180.0 ) )
        };
    }
};
module.exports = {
    sameLine: function(planetPos) {
        const nearest = planetPos.find( (p) => p.name === "ferengi"),
              further = planetPos.find( (p) => p.name === "betasoide"),
              remain = planetPos.find( (p) => p.name === "vulcano"),
              sun = { x: 0, y: 0, name: "sun"};

        const line = Sylvester.Line.create( [nearest.x, nearest.y], [further.x, further.y]);

        return ![remain, sun].some( (p) => !line.contains([p.x, p.y]) );
    },

    planetPositions: function(day) {
        return Object.keys(Planets.planets).map( (p) => {
            return {
                x: Planets.where(p, day).x,
                y: Planets.where(p, day).y,
                name: p
            };
        });
    },

    clime: function(day) {
        const response = { dia: day },
              planetPositions = this.planetPositions( Number.parseInt(day) );

        if ( this.sameLine(planetPositions) ) {
            response.clima = "sequia";
        }

        response.metadata = planetPositions;
        return response;
    }
};
