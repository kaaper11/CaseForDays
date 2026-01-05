const StrategiaLosowania = require("./strategiaLosowania");

class StandardStrategiaLosowania extends StrategiaLosowania {
    constructor(items) {
        super(items);
    }

    roll() {
        return this.items[Math.floor(Math.random() * this.items.length)];
    }
}
module.exports = StandardStrategiaLosowania;