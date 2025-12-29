const router = require("express").Router();
const authmiddleware = require("../middlewares/authMiddleware");

router.post('/additem', authmiddleware, cas)

module.exports = router;