class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }

    addItemSkin = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ message: "Brak danych formularza" });
            }

            const {
                name,
                rarity,
                price,
                weaponType,
                startrak,
                stan
            } = req.body;

            const image = req.file?.filename;

            if (!name || !rarity || !price || !weaponType || !stan || !image) {
                return res.status(400).json({ message: "Uzupełnij wszystkie pola" });
            }

            const result = await this.itemService.addItemSkin({
                name,
                rarity,
                price,
                weaponType,
                startrak: startrak === "true",
                stan,
                image
            });

            return res.status(201).json(result);

        } catch (err) {
            console.error("addItemSkin error:", err);
            return res.status(500).json({
                message: "Błąd serwera",
                error: err.message
            });
        }
    };

    addItemKnife = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ message: "Brak danych formularza" });
            }

            const {
                name,
                rarity,
                price,
                weaponType,
                startrak,
                stan
            } = req.body;

            const image = req.file?.filename;

            if (!name || !rarity || !price || !weaponType || !stan || !image) {
                return res.status(400).json({ message: "Uzupełnij wszystkie pola" });
            }

            const result = await this.itemService.addItemKnife({
                name,
                rarity,
                price,
                weaponType,
                startrak: startrak === "true",
                stan,
                image
            });

            return res.status(201).json(result);

        } catch (err) {
            console.error("addItemKnife error:", err);
            return res.status(500).json({
                message: "Błąd serwera",
                error: err.message
            });
        }
    };

    addItemSticker = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ message: "Brak danych formularza" });
            }

            const {
                name,
                rarity,
                price,
                czyHolo,
                turniej,
                druzyna,
                czyZlota,
                rok
            } = req.body;

            const image = req.file?.filename;

            if (!name || !rarity || !price || !turniej || !druzyna || !rok || !image) {
                return res.status(400).json({ message: "Uzupełnij wszystkie pola" });
            }

            const result = await this.itemService.addItemSticker({
                name,
                rarity,
                price,
                image,
                czyHolo: czyHolo === "true",
                turniej,
                druzyna,
                czyZlota: czyZlota === "true",
                rok
            });

            return res.status(201).json(result);

        } catch (err) {
            console.error("addItemSticker error:", err);
            return res.status(500).json({
                message: "Błąd serwera",
                error: err.message
            });
        }
    };

    allItems = async (req, res) => {
        try {
            const items = await this.itemService.allItems();
            return res.status(200).json(items);
        } catch (err) {
            return res.status(500).json({
                message: "Błąd serwera",
                error: err.message
            });
        }
    };
}

module.exports = ItemController;
