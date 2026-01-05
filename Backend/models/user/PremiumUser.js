const User = require('./User');

class PremiumUser extends User{

    jakaZnizka(){
        return 0.9;
    }

}

module.exports = PremiumUser;