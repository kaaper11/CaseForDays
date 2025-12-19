class Case {
    constructor(id, nazwa, cena, pojemnosc, startegiaLosowania, zdjecie) {
        this.id = id;
        this.nazwa = nazwa;
        this.cena = cena;
        this.pojemnosc = pojemnosc;
        this.startegiaLosowania = startegiaLosowania;
        this.zdjecie = zdjecie;
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