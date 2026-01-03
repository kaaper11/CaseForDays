const SkinItem = require("./SkinItem");

class KnifeItem extends SkinItem {
        constructor(id, nazwa, poziom_rzadkości, wartość, zdjecie,type, typBroni, startrak, stan, pattern = Math.random().toFixed(2)) {
            super(id, nazwa, poziom_rzadkości, wartość, zdjecie,type, typBroni, startrak, stan);
            this.pattern = pattern;
        }

        pobierz_cene() {
            let next =  super.pobierz_cene();
            next += (this.pattern * next);
            return next;
        }

        pobierz_opis() {
            let next =  super.pobierz_opis();
            return next + '\n' + 'pattern: ' + this.pattern*100 + '%' + '\n' + this.wyjatjowy();
        }

        wyjatjowy(){
            if (this.pattern > 0.7){
                return "Legendarny";
            }
            return 'Powszechny';
        }
}

module.exports = KnifeItem;