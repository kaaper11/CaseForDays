const DbCases = require("../DbModels/Cases");
const Case = require("../models/case/Case");
const EventCase = require("../models/case/EventCase");
const PremiumCase = require("../models/case/PremiumCase");
const SL = require('../strategies/StandardStrategiaLosowania');
const PSL = require('../strategies/PremiumStrategiaLosowania');
const cosa = require("../models/case/PremiumCase");


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

    async allCases(){
        const cases = await DbCases.find({});

        const cs = cases.map((cos) =>{
            switch(cos.type){
                case 'Standardowa': {
                    const st = new Case(
                        cos._id,
                        cos.name,
                        cos.price,
                        new SL(cos.items),
                        cos.image,
                        cos.items
                    );
                    return {
                        id: st.id,
                        name: st.nazwa,
                        price: st.cena,
                        type: 'Standardowa',
                        image: st.zdjecie,
                        items: st.items,
                    }
                }
                case "Premium": {
                    const st = new PremiumCase(
                        cos._id,
                        cos.name,
                        cos.price,
                        new PSL(cos.items),
                        cos.image,
                        cos.items,
                        cos.bonus
                    );
                    return {
                        id: st.id,
                        name: st.nazwa,
                        price: st.cena,
                        type: 'Premium',
                        image: st.zdjecie,
                        items: st.items,
                        bonus: st.bonus
                    }
                }
                case "Eventowa": {
                    const st = new EventCase(
                        cos._id,
                        cos.name,
                        cos.price,
                        new SL(cos.items),
                        cos.image,
                        cos.items,
                        cos.event
                    );
                    return {
                        id: st.id,
                        name: st.nazwa,
                        price: st.cena,
                        type: 'Eventowa',
                        image: st.zdjecie,
                        items: st.items,
                        bonus: st.event
                    }
                }
            }
        })
        return cs;
    }

    async oneCase(id){
        const cos = await DbCases.findById(id);

        if (cos.type === 'Standardowa') {
            const cosa = new Case(
                cos._id,
                cos.name,
                cos.price,
                new SL(cos.items),
                cos.image,
                cos.items
            )
            return {
                id: cosa.id,
                name: cosa.nazwa,
                price: cosa.cena,
                type: 'Standardowa',
                image: cosa.zdjecie,
                items: cosa.items,
            }

        } else if (cos.type === 'Premium') {
            const st = new PremiumCase(
                cos._id,
                cos.name,
                cos.price,
                new PSL(cos.items),
                cos.image,
                cos.items,
                cos.bonus
            )
            return {
                id: st.id,
                name: st.nazwa,
                price: st.cena,
                type: 'Premium',
                image: st.zdjecie,
                items: st.items,
                bonus: st.bonus
            }
        } else {
            const st = new EventCase(
                cos._id,
                cos.name,
                cos.price,
                new PSL(cos.items),
                cos.image,
                cos.items,
                cos.event
            )
            return {
                id: st.id,
                name: st.nazwa,
                price: st.cena,
                type: 'Eventowa',
                image: st.zdjecie,
                items: st.items,
                event: st.event

            }
        }
    }


}

module.exports = CaseService;