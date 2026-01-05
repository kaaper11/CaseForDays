class Inventory {
    constructor(items = []) {
        this.items = items;
    }


    dodaj_przedmiot(item){
        this.items.push(item);
    }

    usun_przedmiot(item){
        let indeks;
        for (let x in this.items) {
            if (this.items[x].id === item.id){
                indeks = x;
                break;
            }
        }
        this.items.splice(indeks, 1);

    }

    wartosc_ekwipunku(){
        let all = 0;

        for(let item of this.items) {
            all += item.pobierz_cene();
        }
        return all;
    }

}

module.exports = Inventory;