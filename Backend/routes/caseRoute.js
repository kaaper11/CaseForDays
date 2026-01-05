const router = require("express").Router();
const authmiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");

const CaseController = require("../controllers/CaseController");
const CaseService = require("../services/CaseService");

const casSer = new CaseService();
const casCon = new CaseController(casSer);

router.post(
    "/addcasestandard",
    authmiddleware,
    upload.single("image"),
    casCon.addCaseStandard
);

router.post(
    "/addcasepremium",
    authmiddleware,
    upload.single("image"),
    casCon.addCasePremium
);

router.post(
    "/addcaseevent",
    authmiddleware,
    upload.single("image"),
    casCon.addCaseEvent
);

router.get(
    "/all",
    authmiddleware,
    casCon.allCases
);

router.get(
    "/:id",
    authmiddleware,
    casCon.getCaseById
);

router.post(
    "/:id/open",
    authmiddleware,
    casCon.openCase
);

module.exports = router;
