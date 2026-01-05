class Case {
    constructor(id, nazwa, cena, startegiaLosowania, zdjecie, items) {
        this.id = id;
        this.nazwa = nazwa;
        this.cena = cena;
        this.startegiaLosowania = startegiaLosowania;
        this.zdjecie = zdjecie;
        this.items = items;
    }

    otworzSkrzynke(user){
        throw new Error("Klasa abstarkcyjna");
    }

    obliczZniszke(user){
        return this.cena * user.jakaZnizka();
    }

    otworzSkrzynke(user) {
        user.usunBalans(this.obliczZniszke(user));
        return this.startegiaLosowania.roll();
    }
}

module.exports = Case;