class Item{
    constructor(id, nazwa, poziom_rzadkości, wartość, zdjecie, stan){
        if (this.constructor === Item){
            throw new Error("Klasa abstakcyjna");
        }
        this.id = id;
        this.nazwa = nazwa;
        this.poziom_rzadkości = poziom_rzadkości;
        this.wartość = wartość;
        this.zdjecie = zdjecie;
    }

    pobierz_cene() {
        throw new Error("Klasa abstarkcyjna");
    }

    pobierz_opis(){
        throw new Error("Klasa abstarkcyjna");
    }
}
module.exports = Item;