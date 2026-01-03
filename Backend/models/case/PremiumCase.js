const Case = require("./Case");

class PremiumCase extends Case {
    constructor(id, nazwa, cena, startegiaLosowania, zdjecie, items,bonus = Math.random().toFixed(2)) {
        super(id, nazwa, cena, startegiaLosowania, zdjecie, items);
        this.bonus = bonus;
    }

}

module.exports = PremiumCase;