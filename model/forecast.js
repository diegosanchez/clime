const Sylvester = require("sylvester"),
      Vec2 = require("vec2"),
      Polygon = require('polygon');

const Planets = {
    planets: {
        ferengi: {
            orbitRadio: 500.0,
            speed: -1.0
        },
        betasoide: {
            orbitRadio: 2000.0,
            speed: -3.0
        },
        vulcano: {
            orbitRadio: 1000.0,
            speed: 5.0
        }
    },

    where: function(planetName, day) {
        const planet = this.planets[planetName];
        return {
            x: (planet.orbitRadio * Math.cos( planet.speed * day * Math.PI / 180.0 )).toFixed(2),
            y: (planet.orbitRadio * Math.sin( planet.speed * day * Math.PI / 180.0 )).toFixed(2)
        };
    }
};
module.exports = {
    planetLine: function(planetPos) {
        const nearest = planetPos.find( (p) => p.name === "ferengi"),
              further = planetPos.find( (p) => p.name === "betasoide");
        return Sylvester.Line.create( [nearest.x, nearest.y], [further.x, further.y]);
    },

    sameLine: function(planetPos) {
        const line = this.planetLine(planetPos),
              remain = planetPos.find( (p) => p.name === "vulcano"),
              sun = { x: 0, y: 0, name: "sun"};

        return ![remain, sun].some( (p) => !line.contains([p.x, p.y]) );
    },

    sunInsidePoligon: function(planetPos) {
        const polygon = new Polygon( planetPos.map( (p) => [p.x, p.y]) );
        return {
            area: Math.abs(polygon.area()),
            contains: polygon.containsPoint( new Vec2(0,0) )
        };
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
        day = Number.parseInt(day);
        const planetPositions = this.planetPositions( day ),
              response = {
                  dia: day,
                  clima: "normal"
              };

        if ( this.sameLine(planetPositions) ) {
            response.clima = "sequia";
        } else if ( this.sunInsidePoligon(planetPositions).contains ) {
            response.clima = "lluvia";
            response.pico = [ 84, 96 ].some( (n) => n === day);
        }

        return response;
    }
};
