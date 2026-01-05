const Item = require("./Item");

class StickerItem extends Item {
    constructor(id, nazwa, poziom_rzadkości, wartość, zdjecie,type, czyHolo, turniej, druzyna, czyZlota, rok) {
        super(id, nazwa, poziom_rzadkości, wartość, zdjecie,type);
        this.czyHolo = czyHolo;
        this.turniej = turniej;
        this.druzyna = druzyna;
        this.czyZlota = czyZlota;
        this.rok = rok;
    }

    pobierz_cene() {
        let cena = this.wartość;
        if (this.czyHolo){
            cena += 100;
        }
        if (this.czyZlota){
            cena += 100;
        }
        if (this.rok < 2018){
            cena += 200;
        }
        return cena;
    }

    pobierz_opis() {
        return this.czyHolo ?  'Naklejka ' + this.nazwa + ' ' + this.druzyna + '(Holo)' + '\n' + this.turniej + ' ' + this.rok
            : 'Naklejka ' + this.nazwa + ' ' + this.druzyna + '\n' + this.turniej + ' ' + this.rok;
    }

}

module.exports = StickerItem;