const dbConn = require("../db/mysql_connect");


const dolulukOrani = (req, res) => {
    dbConn.query(`SELECT oda_doluluk_log.oda_id, oda_doluluk_log.eski_doluluk_orani, oda_doluluk_log.tarih FROM oda_doluluk_log;`, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}

module.exports = {
    dolulukOrani
}