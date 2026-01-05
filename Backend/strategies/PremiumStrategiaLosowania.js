const StrategiaLosowania = require("./strategiaLosowania");

class PremiumStrategiaLosowania extends StrategiaLosowania {
    constructor(items) {
        super(items);
    }
    roll() {
        let liczba = Math.floor(Math.random() * this.items.length)
        if (liczba === this.items.length) {
            return this.items[liczba];
        }
        return this.items[(Math.floor(Math.random() * this.items.length))+1];
    }
}