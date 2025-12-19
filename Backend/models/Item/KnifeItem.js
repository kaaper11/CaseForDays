const SkinItem = require("./SkinItem");

class KnifeItem extends SkinItem {
        constructor() {
            super();
            this.pattern = Math.random().toFixed(2);
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