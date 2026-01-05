const DbCases = require("../DbModels/Cases");
const Case = require("../models/case/Case");
const EventCase = require("../models/case/EventCase");
const PremiumCase = require("../models/case/PremiumCase");
const SL = require("../strategies/StandardStrategiaLosowania");
const PSL = require("../strategies/PremiumStrategiaLosowania");
const DbItems = require("../DbModels/Items");

class CaseService {

    async addCaseStandard(data) {
        const { name, price, type, image, items } = data;

        const one = await DbCases.findOne({ name });
        if (one) {
            throw new Error("Skrzynka o takiej nazwie już istnieje!");
        }

        const newCase = new Case(
            null,
            name,
            price,
            new SL(items),
            image,
            items
        );

        const newDbItem = new DbCases({
            name: newCase.nazwa,
            price: newCase.cena,
            type,
            image: newCase.zdjecie,
            items: newCase.items,
        });

        await newDbItem.save();

        return { message: "Skrzynka została dodana!" };
    }

    async addCasePremium(data) {
        const { name, price, type, image, items, bonus } = data;

        const one = await DbCases.findOne({ name });
        if (one) {
            throw new Error("Skrzynka o takiej nazwie już istnieje!");
        }

        const newCase = new PremiumCase(
            null,
            name,
            price,
            new PSL(items),
            image,
            items,
            bonus
        );

        const newDbItem = new DbCases({
            name: newCase.nazwa,
            price: newCase.cena,
            type,
            image: newCase.zdjecie,
            items: newCase.items,
            bonus: newCase.bonus,
        });

        await newDbItem.save();

        return { message: "Skrzynka została dodana!" };
    }

    async addCaseEvent(data) {
        const { name, price, type, image, items, event } = data;

        const one = await DbCases.findOne({ name });
        if (one) {
            throw new Error("Skrzynka o takiej nazwie już istnieje!");
        }

        const newCase = new EventCase(
            null,
            name,
            price,
            new SL(items),
            image,
            items,
            event
        );

        const newDbItem = new DbCases({
            name: newCase.nazwa,
            price: newCase.cena,
            type,
            image: newCase.zdjecie,
            items: newCase.items,
            event: newCase.event,
        });

        await newDbItem.save();

        return { message: "Skrzynka została dodana!" };
    }

    async allCases() {
        return await DbCases.find();
    }

    async getCaseById(id) {
        return await DbCases.findById(id);
    }

    async openCase(caseId) {
        try {
            const oneCase = await DbCases.findById(caseId);

            console.log("CASE FOUND:", oneCase);

            if (!oneCase) {
                throw new Error("Skrzynka nie istnieje");
            }

            console.log("CASE ITEMS (RAW):", oneCase.items);

            const items = await DbItems.find({
                _id: { $in: oneCase.items }
            });

            console.log("ITEMS FOUND IN DB:", items);

            if (!items.length) {
                throw new Error("Nie znaleziono itemów w bazie");
            }


            console.log("COLLECTION USED:", DbItems.collection.name);

            const all = await DbItems.find({});
            console.log("ALL ITEMS:", all.length);

            const randomIndex = Math.floor(Math.random() * items.length);
            const wonItem = items[randomIndex];

            return {
                items,
                wonItem
            };

        } catch (err) {
            console.error("OPEN CASE ERROR:", err);
            throw err;
        }
    }

}

module.exports = CaseService;
