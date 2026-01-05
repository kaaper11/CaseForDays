const mongoose = require("mongoose");

class CaseController {
    constructor(caseService) {
        this.caseService = caseService;
    }

    addCaseStandard = async (req, res) => {
        try {
            const { name, price, type, items } = req.body;
            const image = req.file?.filename;

            const parsedItems =
                typeof items === "string" ? JSON.parse(items) : items;

            if (
                !name ||
                !price ||
                !type ||
                !image ||
                !parsedItems ||
                !parsedItems.length
            ) {
                return res.status(400).json({
                    message: "Uzupełnij wszystkie pola"
                });
            }


            const itemIds = parsedItems.map(id =>
                new mongoose.Types.ObjectId(id)
            );

            const result = await this.caseService.addCaseStandard({
                name,
                price,
                type,
                image,
                items: itemIds
            });

            return res.status(201).json(result);

        } catch (err) {
            console.error("ADD CASE STANDARD ERROR:", err);
            return res.status(500).json({
                message: "Błąd serwera",
                error: err.message
            });
        }
    };

    addCasePremium = async (req, res) => {
        try {
            const { name, price, type, items, bonus } = req.body;
            const image = req.file?.filename;

            const parsedItems =
                typeof items === "string" ? JSON.parse(items) : items;

            if (
                !name ||
                !price ||
                !type ||
                !image ||
                !parsedItems ||
                !parsedItems.length ||
                !bonus
            ) {
                return res.status(400).json({
                    message: "Uzupełnij wszystkie pola"
                });
            }

            const itemIds = parsedItems.map(item =>
                new mongoose.Types.ObjectId(item._id)
            );

            const result = await this.caseService.addCasePremium({
                name,
                price,
                type,
                image,
                items: itemIds,
                bonus
            });

            return res.status(201).json(result);

        } catch (err) {
            console.error("ADD CASE PREMIUM ERROR:", err);
            return res.status(500).json({
                message: "Błąd serwera",
                error: err.message
            });
        }
    };

    addCaseEvent = async (req, res) => {
        try {
            const { name, price, type, items, event } = req.body;
            const image = req.file?.filename;

            const parsedItems =
                typeof items === "string" ? JSON.parse(items) : items;

            if (
                !name ||
                !price ||
                !type ||
                !image ||
                !parsedItems ||
                !parsedItems.length ||
                !event
            ) {
                return res.status(400).json({
                    message: "Uzupełnij wszystkie pola"
                });
            }

            const itemIds = parsedItems.map(item =>
                new mongoose.Types.ObjectId(item._id)
            );

            const result = await this.caseService.addCaseEvent({
                name,
                price,
                type,
                image,
                items: itemIds,
                event
            });

            return res.status(201).json(result);

        } catch (err) {
            console.error("ADD CASE EVENT ERROR:", err);
            return res.status(500).json({
                message: "Błąd serwera",
                error: err.message
            });
        }
    };

    allCases = async (req, res) => {
        try {
            const cases = await this.caseService.allCases();
            return res.status(200).json(cases);
        } catch (err) {
            return res.status(500).json({
                message: "Błąd pobierania skrzynek",
                error: err.message
            });
        }
    };

    getCaseById = async (req, res) => {
        try {
            const { id } = req.params;

            const oneCase = await this.caseService.getCaseById(id);

            if (!oneCase) {
                return res.status(404).json({ message: "Skrzynka nie istnieje" });
            }

            return res.status(200).json(oneCase);

        } catch (err) {
            return res.status(500).json({
                message: "Błąd pobierania skrzynki",
                error: err.message
            });
        }
    };

    openCase = async (req, res) => {
        try {
            const { id } = req.params;

            const result = await this.caseService.openCase(id);

            return res.status(200).json(result);

        } catch (err) {
            console.error("OPEN CASE CONTROLLER ERROR:", err);
            return res.status(500).json({
                message: "Błąd otwierania skrzynki",
                error: err.message
            });
        }
    };
}

module.exports = CaseController;
