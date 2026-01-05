const router = require("express").Router();
const authmiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");

const ItemController = require("../controllers/ItemController");
const ItemService = require("../services/itemService");

const itemSer = new ItemService();
const itemCon = new ItemController(itemSer);

router.post(
    "/additemskin",
    authmiddleware,
    upload.single("image"),
    itemCon.addItemSkin
);

router.post(
    "/additemsticker",
    authmiddleware,
    upload.single("image"),
    itemCon.addItemSticker
);

router.post(
    "/additemknife",
    authmiddleware,
    upload.single("image"),
    itemCon.addItemKnife
);

router.get("/allitems", authmiddleware, itemCon.allItems);

module.exports = router;
