class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }

    addItemSkin = async (req, res) => {
        const { name, rarity, price, image, weaponType, startrak, stan } = req.body;

        try {

            if (!name || !rarity || !price || !image || !weaponType || !startrak || !stan) {
                return res.status(400).json({message:"Uzupełnij pola pls"});
            }

            const dalej = await this.itemService.addItemSkin({name, rarity, price, image, weaponType, startrak, stan});

            return res.status(200).json({message:"Przedmiot został dodany!"});

        }catch(err){
            return res.status(500).json({message: "Błąd: " + err});
        }
    }


}