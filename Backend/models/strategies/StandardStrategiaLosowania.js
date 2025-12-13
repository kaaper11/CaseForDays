const StrategiaLosowania = require("./StrategiaLosowania");

class StandardStrategiaLosowania extends StrategiaLosowania {
    constructor(items) {
        super();
        this.items = items;
    }

    roll() {
        return this.items[Math.floor(Math.random() * this.items.length)];
    }
}
module.exports = StandardStrategiaLosowania;