const DbCases = require("../DbModels/Cases");
const DbItems = require("../DbModels/Items");

const Case = require("../models/case/Case");
const EventCase = require("../models/case/EventCase");
const PremiumCase = require("../models/case/PremiumCase");

const SL = require("../strategies/StandardStrategiaLosowania");
const PSL = require("../strategies/PremiumStrategiaLosowania");

class CaseService {


    async resolveItems(items) {
        if (!items || items.length === 0) return [];

        if (typeof items[0] === "object") {
            return items;
        }

        return await DbItems.find({
            _id: { $in: items }
        });
    }

    async addCaseStandard(data) {
        const { name, price, type, image, items } = data;

        if (await DbCases.findOne({ name })) {
            throw new Error("Skrzynka o takiej nazwie już istnieje!");
        }

        const itemObjects = await this.resolveItems(items);

        if (itemObjects.length === 0) {
            throw new Error("Nie znaleziono itemów");
        }

        const newCase = new Case(
            null,
            name,
            price,
            new SL(itemObjects),
            image,
            itemObjects
        );

        const newDbCase = new DbCases({
            name: newCase.nazwa,
            price: newCase.cena,
            type,
            image: newCase.zdjecie,
            items: newCase.items
        });

        await newDbCase.save();
        return { message: "Skrzynka standardowa dodana" };
    }


    async addCasePremium(data) {
        const { name, price, type, image, items, bonus } = data;

        if (await DbCases.findOne({ name })) {
            throw new Error("Skrzynka o takiej nazwie już istnieje!");
        }

        const itemObjects = await this.resolveItems(items);

        if (itemObjects.length === 0) {
            throw new Error("Nie znaleziono itemów");
        }

        const newCase = new PremiumCase(
            null,
            name,
            price,
            new PSL(itemObjects),
            image,
            itemObjects,
            bonus
        );

        const newDbCase = new DbCases({
            name: newCase.nazwa,
            price: newCase.cena,
            type,
            image: newCase.zdjecie,
            items: newCase.items,
            bonus: newCase.bonus
        });

        await newDbCase.save();
        return { message: "Skrzynka premium dodana" };
    }

    async addCaseEvent(data) {
        const { name, price, type, image, items, event } = data;

        if (await DbCases.findOne({ name })) {
            throw new Error("Skrzynka o takiej nazwie już istnieje!");
        }

        const itemObjects = await this.resolveItems(items);

        if (itemObjects.length === 0) {
            throw new Error("Nie znaleziono itemów");
        }

        const newCase = new EventCase(
            null,
            name,
            price,
            new SL(itemObjects),
            image,
            itemObjects,
            event
        );

        const newDbCase = new DbCases({
            name: newCase.nazwa,
            price: newCase.cena,
            type,
            image: newCase.zdjecie,
            items: newCase.items,
            event: newCase.event
        });

        await newDbCase.save();
        return { message: "Skrzynka eventowa dodana" };
    }

    async allCases() {
        const cases = await DbCases.find({});

        return Promise.all(
            cases.map(async (cos) => {
                const resolvedItems = await this.resolveItems(cos.items);

                return {
                    id: cos._id,
                    name: cos.name,
                    price: cos.price,
                    type: cos.type,
                    image: cos.image,
                    items: resolvedItems,
                    bonus: cos.bonus,
                    event: cos.event
                };
            })
        );
    }


    async oneCase(id) {
        const cos = await DbCases.findById(id);
        if (!cos) return null;

        const resolvedItems = await this.resolveItems(cos.items);

        return {
            id: cos._id,
            name: cos.name,
            price: cos.price,
            type: cos.type,
            image: cos.image,
            items: resolvedItems,
            bonus: cos.bonus,
            event: cos.event
        };
    }
}

module.exports = CaseService;
