class User {
    constructor(id, nickname, email, password, balance, inventory) {
        if (this.constructor === User){
            throw new Error('Abstrakcyjna klasa, nie można stowrzyć obiektu.')
        }
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.inventory = inventory;
    }

    dodajBalans(balancePlus) {
        this.balance += balancePlus;
    }

    dodajEkwipunek(item) {
        this.inventory.push(item);
    }

    usunBalans(balanceMinus){
        if (this.balance < balanceMinus) {
            throw new Error('Za mało pienędzy na Twoim koncie.')
        }
        this.balance -= balanceMinus;
    }

    jakaZnizka(){
        throw new Error('Abstrakycja klasa')
    }
}

module.exports = User;