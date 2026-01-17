class CaseController {
    constructor(caseService) {
        this.caseService = caseService;
    }

    addCaseStandard = async (req, res) => {
        const { name, price, image, items } = req.body;

        try {
            if (!name || !price || !image || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: "Uzupełnij pola pls" });
            }

            const dalej = await this.caseService.addCaseStandard({
                name,
                price,
                image,
                items,
                type: "Standardowa"
            });

            return res.status(200).json({ message: "OK" });
        } catch (err) {
            return res.status(500).json({ message: "Błąd: " + err.message });
        }
    };

    addCasePremium = async (req, res) => {
        const { name, price, image, items, bonus } = req.body;

        try {
            if (!name || !price || !image || !bonus || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: "Uzupełnij pola pls" });
            }

            const dalej = await this.caseService.addCasePremium({
                name,
                price,
                image,
                items,
                bonus,
                type: "Premium"
            });

            return res.status(200).json({ message: "OK" });
        } catch (err) {
            return res.status(500).json({ message: "Błąd: " + err.message });
        }
    };

    addCaseEvent = async (req, res) => {
        const { name, price, image, items, event } = req.body;

        try {
            if (
                !name ||
                !price ||
                !image ||
                !event ||
                !Array.isArray(items) ||
                items.length === 0
            ) {
                return res.status(400).json({ message: "Uzupełnij pola pls" });
            }

            const dalej = await this.caseService.addCaseEvent({
                name,
                price,
                image,
                items,
                event,
                type: "Eventowa"
            });

            return res.status(200).json({ message: "OK" });
        } catch (err) {
            return res.status(500).json({ message: "Błąd: " + err.message });
        }
    };

    allCases = async (req, res) => {
        try {
            const cases = await this.caseService.allCases();
            return res.status(200).json(cases);
        } catch (err) {
            return res.status(500).json({ message: "Błąd pobierania skrzynek" });
        }
    };

    oneCase = async (req, res) => {
        try {
            const { id } = req.params;
            const oneCase = await this.caseService.oneCase(id);

            if (!oneCase) {
                return res.status(404).json({ message: "Skrzynka nie istnieje" });
            }

            return res.status(200).json(oneCase);
        } catch (err) {
            return res.status(500).json({ message: "Błąd pobierania skrzynki" });
        }
    };

    openCase = async (req, res) => {
        try {
            const { id } = req.params;
            const caseData = await this.caseService.oneCase(id);

            if (!caseData || !Array.isArray(caseData.items) || caseData.items.length === 0) {
                return res.status(400).json({ message: "Skrzynka nie ma przedmiotów" });
            }

            const randomIndex = Math.floor(Math.random() * caseData.items.length);
            const wonItem = caseData.items[randomIndex];

            return res.status(200).json({
                items: caseData.items,
                wonItem
            });
        } catch (err) {
            return res.status(500).json({ message: "Błąd otwierania skrzynki" });
        }
    };
}

module.exports = CaseController;
