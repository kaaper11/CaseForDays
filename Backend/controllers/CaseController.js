class CaseController {
    constructor(caseService) {
        this.caseService = caseService;
    }

    addCaseStandard = async (req, res) => {
        const { name, price, type, image, items } = req.body;

        try {
           if (!name || !price || !type || !image || !items) {
               return res.status(400).json({message:"Uzupełnij pola pls"});
           }
           const dalej = await this.caseService.addCaseStandard({name, price, type, image, items});

            return res.status(200).json({ message: dalej.message });
        }catch(err){
            return res.status(500).json({message: 'Błąd: ' + err});
        }
    }

    addCasePremium = async (req, res) => {
        const { name, price, type, image, items, bonus } = req.body;

        try {
            if (!name || !price || !type || !image || !items || !bonus) {
                return res.status(400).json({message:"Uzupełnij pola pls"});
            }
            const dalej = await this.caseService.addCasePremium({name, price, type, image, items, bonus});
            return res.status(200).json({ message: dalej.message });
        }catch(err){
            return res.status(500).json({message: 'Błąd: ' + err});
        }
    }

    addCaseEvent = async (req, res) => {
        const { name, price, type, image, items, event } = req.body;

        try {
            if (!name || !price || !type || !image || !items || !event) {

                return res.status(400).json({message:"Uzupełnij pola pls"});
            }

            const dalej = await this.caseService.addCaseEvent({name, price, type, image, items, event});
            return res.status(200).json({ message: dalej.message });
        }catch(err){
            return res.status(500).json({message: 'Błąd: ' + err});
        }
    }

    allCases = async (req, res) => {
        try {
            const cases = await this.caseService.allCases();
            return res.status(200).json(cases);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Błąd pobierania skrzynek",
                error: err.message
            });
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
            return res.status(500).json({
                message: "Błąd pobierania skrzynki",
                error: err.message
            });
        }
    }

}

module.exports = CaseController;