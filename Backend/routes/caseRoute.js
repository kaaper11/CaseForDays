const router = require("express").Router();
const authmiddleware = require("../middlewares/authMiddleware");
const CaseController = require("../controllers/CaseController");
const CaseService = require("../services/CaseService");


const casSer = new CaseService();
const casCon = new CaseController(casSer);

router.post("/addcasestandard", authmiddleware, casCon.addCaseStandard);
router.post("/addcasepremium", authmiddleware, casCon.addCasePremium);
router.post("/addcaseevent", authmiddleware, casCon.addCaseEvent);

router.get("/all", casCon.allCases);
router.get("/:id", casCon.oneCase);

router.post("/:id/open", casCon.openCase);

module.exports = router;
