const Case = require("./Case");

class EventCase extends Case {
    constructor(id, nazwa, cena, startegiaLosowania, zdjecie, items,event) {
        super(id, nazwa, cena, startegiaLosowania, zdjecie, items);
        this.event = event;
    }
}