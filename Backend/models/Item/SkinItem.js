const Item = require("./Item");

class SkinItem extends Item {
    constructor(id, nazwa, poziom_rzadkości, wartość, zdjecie,type, typBroni, startrak, stan) {
        super(id, nazwa, poziom_rzadkości, wartość, zdjecie,type);
        this.typBroni = typBroni;
        this.startrak = startrak;
        this.stan = stan;
    }

    pobierz_cene() {
        let cena = this.wartość;
        if (this.startrak){
            cena += 100;
        }
        if (this.stan === 'Factory new'){
            cena +=200;
        }else if(this.stan === 'Minimal wear'){
            cena += 100;
        }else if(this.stan === 'Field-Tested'){
            cena += 50;
        }else if(this.stan === 'Well-Worn'){
            cena -= 50;
        }else {
            cena -= 100;
        }
        return cena;
    }

    pobierz_opis(){
        return this.startrak ? this.typBroni + ' | ' + this.nazwa + ' (' + this.stan + ')' + '\n' + 'StatTrak™'
            : this.typBroni + ' | ' + this.nazwa + ' (' + this.stan + ')';

    }

}

module.exports = SkinItem;