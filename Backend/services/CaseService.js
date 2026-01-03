const DbCases = require("../DbModels/Cases");
const Case = require("../models/case/Case");
const EventCase = require("../models/case/EventCase");
const PremiumCase = require("../models/case/PremiumCase");
const SL = require('../strategies/StandardStrategiaLosowania');
const PSL = require('../strategies/PremiumStrategiaLosowania');


class CaseService {

    async addCaseStandard(data){
        const { name, price, type, image, items } = data;

        const one = await DbCases.findOne({name: name});
        if(one){
            throw new Error('Skrzynka o takiej nazwie już istnieje!')
        }

           const newCase = new Case(
                null,
                name,
                price,
                new SL(items),
                image,
                items,
            )

           const newDbItem = new DbCases({
               name: newCase.nazwa,
               price: newCase.cena,
               type: type,
               image: newCase.zdjecie,
               items: newCase.items,
           })

        newDbItem.save();

        return {message: 'Skrzynka została dodana!'}
    }

    async addCasePremium(data){
        const { name, price, type, image, items, bonus } = data;

        const one = await DbCases.findOne({name: name});
        if(one){
            throw new Error('Skrzynka o takiej nazwie już istnieje!')
        }

        const newCase = new PremiumCase(
            null,
            name,
            price,
            new PSL(items),
            image,
            items,
            bonus
        )

        const newDbItem = new DbCases({
            name: newCase.nazwa,
            price: newCase.cena,
            type: type,
            image: newCase.zdjecie,
            items: newCase.items,
            bonus: newCase.bonus
        })

        newDbItem.save();

        return {message: 'Skrzynka została dodana!'}
    }

    async addCaseEvent(data){
        const { name, price, type, image, items, event } = data;

        const one = await DbCases.findOne({name: name});
        if(one){
            throw new Error('Skrzynka o takiej nazwie już istnieje!')
        }

        const newCase = new EventCase(
            null,
            name,
            price,
            new SL(items),
            image,
            items,
            event
        )

        const newDbItem = new DbCases({
            name: newCase.nazwa,
            price: newCase.cena,
            type: type,
            image: newCase.zdjecie,
            items: newCase.items,
            event: newCase.event
        })

        newDbItem.save();

        return {message: 'Skrzynka została dodana!'}
    }


}

module.exports = CaseService;