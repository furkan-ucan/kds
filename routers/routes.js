const router = require("express").Router();

const {dolulukOrani} = require("../controllers/controller");
router.get("/dolulukOrani", dolulukOrani);

const {iptalOrani} = require("../controllers/controller");
router.get("/iptalOrani", iptalOrani);

const {dolulukOraniAnaliz} = require("../controllers/controller");
router.get("/dolulukOraniAnaliz", dolulukOraniAnaliz);

const {talepOrani} = require("../controllers/controller");
router.get("/talepOrani", talepOrani);

const {dolulukOraniKarsilastirma} = require("../controllers/controller");
router.get("/dolulukOraniKarsilastirma", dolulukOraniKarsilastirma);

const {iptalOraniKarsilastirma} = require("../controllers/controller");
router.get("/iptalOraniKarsilastirma", iptalOraniKarsilastirma);

const {talepOraniKarsilastirma} = require("../controllers/controller");
router.get("/talepOraniKarsilastirma", talepOraniKarsilastirma);

const {fiyatPerformans} = require("../controllers/controller");
router.post("/fiyatPerformans", fiyatPerformans);

const {karsilastirmaDoluluk} = require("../controllers/controller");
router.get("/karsilastirmaDoluluk", karsilastirmaDoluluk);

const {karsilastirmaDoluluk1} = require("../controllers/controller");
router.get("/karsilastirmaDoluluk1", karsilastirmaDoluluk1);

const {karsilastirmaIptal} = require("../controllers/controller");
router.get("/karsilastirmaIptal", karsilastirmaIptal);

const {karsilastirmaTalep} = require("../controllers/controller");
router.get("/karsilastirmaTalep", karsilastirmaTalep);

module.exports = router;
