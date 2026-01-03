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
                const dalej = await this.caseService.addCasePremium({name, price, type, image, items, bonus});
                return res.status(200).json({ message: dalej.message });
            }
        }catch(err){
            return res.status(500).json({message: 'Błąd: ' + err});
        }
    }

    addCaseEvent = async (req, res) => {
        const { name, price, type, image, items, event } = req.body;

        try {
            if (!name || !price || !type || !image || !items || !event) {
                const dalej = await this.caseService.addCaseEvent({name, price, type, image, items, event});
                return res.status(200).json({ message: dalej.message });
            }
        }catch(err){
            return res.status(500).json({message: 'Błąd: ' + err});
        }
    }
}

module.exports = CaseController;