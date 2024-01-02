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

const {karsilastirmaDoluluk1} = require("../controllers/controller");
router.get("/karsilastirmaDoluluk1/:oda_id", karsilastirmaDoluluk1);



router.get("/karsilastirmaDoluluk/:oda_id", karsilastirmaDoluluk);

const {karsilastirmaIptal} = require("../controllers/controller");
router.get("/karsilastirmaIptal/:oda_id", karsilastirmaIptal);

const {karsilastirmaIptal1} = require("../controllers/controller");
router.get("/karsilastirmaIptal1/:oda_id", karsilastirmaIptal1);



const {karsilastirmaTalep} = require("../controllers/controller");
router.get("/karsilastirmaTalep/:oda_id", karsilastirmaTalep);

const {karsilastirmaTalep1} = require("../controllers/controller");
router.get("/karsilastirmaTalep1/:oda_id", karsilastirmaTalep1);


module.exports = router;
