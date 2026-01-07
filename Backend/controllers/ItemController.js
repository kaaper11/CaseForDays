class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }

    addItemSkin = async (req, res) => {
        const { name, rarity, price, image, weaponType, startrak, stan } = req.body;

        try {
            if (
                !name ||
                !rarity ||
                price === undefined ||
                !image ||
                !weaponType ||
                startrak === undefined ||
                !stan
            ) {
                return res.status(400).json({ message: "Uzupełnij pola pls" });
            }

            const dalej = await this.itemService.addItemSkin({
                name,
                rarity,
                price,
                image,
                weaponType,
                startrak,
                stan,
            });

            return res.status(200).json({ message: dalej.message });
        } catch (err) {
            return res.status(500).json({ message: "Błąd: " + err });
        }
    };

    addItemKnife = async (req, res) => {
        const { name, rarity, price, image, weaponType, startrak, stan } = req.body;

        try {
            if (
                !name ||
                !rarity ||
                price === undefined ||
                !image ||
                !weaponType ||
                startrak === undefined ||
                !stan
            ) {
                return res.status(400).json({ message: "Uzupełnij pola pls" });
            }

            const dalej = await this.itemService.addItemKnife({
                name,
                rarity,
                price,
                image,
                weaponType,
                startrak,
                stan,
            });

            return res.status(200).json({ message: dalej.message });
        } catch (err) {
            return res.status(500).json({ message: "Błąd: " + err });
        }
    };

    addItemSticker = async (req, res) => {
        const {
            name,
            rarity,
            price,
            image,
            czyHolo,
            turniej,
            druzyna,
            czyZlota,
            rok,
        } = req.body;

        try {
            if (
                !name ||
                !rarity ||
                price === undefined ||
                !image ||
                czyHolo === undefined ||
                !turniej ||
                !druzyna ||
                czyZlota === undefined ||
                rok === undefined
            ) {
                return res.status(400).json({ message: "Uzupełnij pola pls" });
            }

            const dalej = await this.itemService.addItemSticker({
                name,
                rarity,
                price,
                image,
                czyHolo,
                turniej,
                druzyna,
                czyZlota,
                rok,
            });

            return res.status(200).json({ message: "Przedmiot został dodany!" });
        } catch (err) {
            return res.status(500).json({ message: "Błąd: " + err });
        }
    };

    allItems = async (req, res) => {
        try {
            const dalej = await this.itemService.allItems();
            return res.status(200).json(dalej);
        } catch (err) {
            return res.status(500).json({ message: "Błąd: " + err });
        }
    };
}

module.exports = ItemController;
