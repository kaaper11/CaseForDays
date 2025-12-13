const Case = require("./Case");

class PremiumCase extends Case {
    constructor(bonus) {
        super();
        this.bonus = bonus;
    }

}

module.exports = PremiumCase;