const User = require('./User');

class NormalUser extends User {
    jakaZnizka() {
        return 1;
    }
}

module.exports = NormalUser;