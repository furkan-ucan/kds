const router = require("express").Router();

const {dolulukOrani} = require("../controllers/controller");
router.get("/dolulukOrani", dolulukOrani);

module.exports = router;
