const router = require("express").Router();
const authmiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
const UserService = require("../services/UserService");

const userSer = new UserService();
const userCon = new userController(userSer);

router.post('/register', userCon.register)
router.post('/login', userCon.login)


module.exports = router;
