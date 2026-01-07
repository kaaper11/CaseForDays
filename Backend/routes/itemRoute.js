const router = require("express").Router();
const authmiddleware = require("../middlewares/authMiddleware");
const ItemController = require("../controllers/ItemController");
const itemService = require("../services/itemService");

const itemSer = new itemService();
const itemCon = new ItemController(itemSer)

router.post('/additemskin', authmiddleware, itemCon.addItemSkin)
router.post('/additemsticker', authmiddleware, itemCon.addItemSticker)
router.post('/additemknife', authmiddleware, itemCon.addItemKnife)

router.get('/allitems', authmiddleware, itemCon.allItems)

module.exports = router;