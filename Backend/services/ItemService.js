const DbItem = require("../DbModels/Items");
const KnifeItem = require("../models/item/KnifeItem");
const SkinItem = require("../models/item/SkinItem");
const StickerItem = require("../models/item/StickerItem");

class ItemService {

    async addItemSkin(data){
        const { name, rarity, price, image, weaponType, startrak, stan} = data;


        const newItem = new SkinItem(
             null,
             name,
             rarity,
             price,
             image,
             'Skin',
             weaponType,
             startrak,
             stan,
        )

        const saveItem = new DbItem({
            name: newItem.nazwa,
            rarity: newItem.poziom_rzadkości,
            price: newItem.wartość,
            image: newItem.zdjecie,
            type: newItem.type,
            weaponType: newItem.typBroni,
            startrak: newItem.startrak,
            stan: newItem.stan,
        })

         saveItem.save();

        return {message: 'Przedmiot został dodany!'}
    }

    async addItemSticker(data){
        const { name, rarity, price, image, czyHolo, turniej, druzyna, czyZlota, rok } = data;


        const newItem = new StickerItem(
            null,
            name,
            rarity,
            price,
            image,
            "Naklejka",
            czyHolo,
            turniej,
            druzyna,
            czyZlota,
            rok
        )

        const saveItem = new DbItem({
            name: newItem.nazwa,
            rarity: newItem.poziom_rzadkości,
            price: newItem.wartość,
            image: newItem.zdjecie,
            type: newItem.type,
            czyHolo: newItem.czyHolo,
            turniej: newItem.turniej,
            druzyna: newItem.druzyna,
            czyZlota: newItem.czyZlota,
            rok: newItem.rok
        })

        saveItem.save();
        return {message: 'Przedmiot został dodany!'}

    }

    async addItemKnife(data){
        const { name, rarity, price, image, weaponType, startrak, stan} = data;


        const newItem = new KnifeItem(
            null,
            name,
            rarity,
            price,
            image,
            "Nóż",
            weaponType,
            startrak,
            stan,
        )

        const saveItem = new DbItem({
            name: newItem.nazwa,
            rarity: newItem.poziom_rzadkości,
            price: newItem.wartość,
            image: newItem.zdjecie,
            type: newItem.type,
            weaponType: newItem.typBroni,
            startrak: newItem.startrak,
            stan: newItem.stan,
            pattern: newItem.pattern,
        })

        saveItem.save();

        return {message: 'Przedmiot został dodany!'}
    }

    async allItems() {
        const items = await DbItem.find();

       const it = items.map((item)=> {
           switch (item.type) {
               case 'Skin': {
                   const skin = new SkinItem(
                       item._id,
                       item.name,
                       item.rarity,
                       item.price,
                       item.image,
                       item.type,
                       item.weaponType,
                       item.startrak,
                       item.stan,
                   );
                   return {
                       id: skin.id,
                       name: skin.nazwa,
                       rarity: skin.poziom_rzadkości,
                       price: skin.wartość,
                       image: skin.zdjecie,
                       type: skin.type,
                       weaponType: skin.typBroni,
                       startrak: skin.startrak,
                       stan: skin.stan,
                       opis: skin.pobierz_opis(),
                       cena: skin.pobierz_cene()
                   };
               }

               case 'Nóż': {
                   const knife = new KnifeItem(
                       item._id,
                       item.name,
                       item.rarity,
                       item.price,
                       item.image,
                       item.type,
                       item.weaponType,
                       item.startrak,
                       item.stan,
                       item.pattern,
                   );
                   return {
                       id: knife.id,
                       name: knife.nazwa,
                       rarity: knife.poziom_rzadkości,
                       price: knife.wartość,
                       image: knife.zdjecie,
                       type: knife.type,
                       weaponType: knife.typBroni,
                       startrak: knife.startrak,
                       stan: knife.stan,
                       pattern: knife.pattern,
                       opis: knife.pobierz_opis(),
                       cena: knife.pobierz_cene()
                   };
               }

               case 'Naklejka': {
                   const sticker = new StickerItem(
                       item._id,
                       item.name,
                       item.rarity,
                       item.price,
                       item.image,
                       item.type,
                       item.czyHolo,
                       item.turniej,
                       item.druzyna,
                       item.czyZlota,
                       item.rok
                   );
                   return {
                       id: sticker.id,
                       name: sticker.nazwa,
                       rarity: sticker.poziom_rzadkości,
                       price: sticker.wartość,
                       image: sticker.zdjecie,
                       type: sticker.type,
                       czyHolo: sticker.czyHolo,
                       turniej: sticker.turniej,
                       druzyna: sticker.druzyna,
                       czyZlota: sticker.czyZlota,
                       rok: sticker.rok,
                       opis: sticker.pobierz_opis(),
                       cena: sticker.pobierz_cene()
                   };
               }
           }
       })
        return it;
    }
}

module.exports = ItemService;