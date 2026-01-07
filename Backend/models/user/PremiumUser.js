const User = require('./User');

class PremiumUser extends User{


    dodajBalans(balancePlus) {
        super.dodajBalans(balancePlus);
        if (balancePlus === 100){
            this.balance += 20;
        } else if (balancePlus === 200){
            this.balance += 30;
        } else {
            this.balance += 40;
        }
    }

    jakaZnizka(){
        return 0.9;
    }

}

module.exports = PremiumUser;