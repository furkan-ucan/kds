const dbConn = require("../db/mysql_connect");


const dolulukOrani = (req, res) => {
    dbConn.query(`SELECT oda_doluluk_log.oda_id, oda_doluluk_log.eski_doluluk_orani, oda_doluluk_log.tarih, oda_doluluk_log.oda_fiyati FROM oda_doluluk_log;`, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}

const dolulukOraniAnaliz = (req, res) => {
    const { oda_id } = req.params;
    dbConn.query(`SELECT oda_doluluk_log.oda_id, oda_doluluk_log.eski_doluluk_orani, oda_doluluk_log.tarih, oda_doluluk_log.oda_fiyati
    FROM oda_doluluk_log
    WHERE oda_doluluk_log.oda_id = ?;`, [oda_id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}

const dolulukOraniKarsilastirma = (req, res) => {
    // Query for 2023 average occupancy rate
    const query2023 = `
        SELECT AVG(eski_doluluk_orani) AS ortalama_2023
        FROM oda_doluluk_log
        WHERE YEAR(tarih) = 2023
    `;

    // Query for 2024 average occupancy rate
    const query2024 = `
        SELECT AVG(eski_doluluk_orani) AS ortalama_2024
        FROM oda_doluluk_log
        WHERE YEAR(tarih) = 2024
    `;

    // Execute the queries
    Promise.all([
        new Promise((resolve, reject) => {
            dbConn.query(query2023, (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        }),
        new Promise((resolve, reject) => {
            dbConn.query(query2024, (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        })
    ])
        .then(([result2023, result2024]) => {
            // Send the results as a JSON response
            res.json({
                average2023: result2023.ortalama_2023,
                average2024: result2024.ortalama_2024
            });
        })
        .catch(error => {
            // Handle the error
            console.error('Error:', error);
            res.status(500).send('An error occurred while fetching the data.');
        });
};

const iptalOraniKarsilastirma = (req, res) => {
    // Query for 2023 average occupancy rate
    const query2023 = `
        SELECT AVG(iptal_miktari) AS ortalama_2023
        FROM oda_iptal_log
        WHERE YEAR(tarih) = 2023
    `;

    // Query for 2024 average occupancy rate
    const query2024 = `
        SELECT AVG(iptal_miktari) AS ortalama_2024
        FROM oda_iptal_log
        WHERE YEAR(tarih) = 2024
    `;

    // Execute the queries
    Promise.all([
        new Promise((resolve, reject) => {
            dbConn.query(query2023, (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        }),
        new Promise((resolve, reject) => {
            dbConn.query(query2024, (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        })
    ])
        .then(([result2023, result2024]) => {
            // Send the results as a JSON response
            res.json({
                average2023: result2023.ortalama_2023,
                average2024: result2024.ortalama_2024
            });
        })
        .catch(error => {
            // Handle the error
            console.error('Error:', error);
            res.status(500).send('An error occurred while fetching the data.');
        });
};

const talepOraniKarsilastirma = (req, res) => {
    // Query for 2023 average occupancy rate
    const query2023 = `
        SELECT AVG(talep_oranı) AS ortalama_2023
        FROM oda_talep_log
        WHERE YEAR(tarih) = 2023
    `;

    // Query for 2024 average occupancy rate
    const query2024 = `
        SELECT AVG(talep_oranı) AS ortalama_2024
        FROM oda_talep_log
        WHERE YEAR(tarih) = 2024
    `;

    // Execute the queries
    Promise.all([
        new Promise((resolve, reject) => {
            dbConn.query(query2023, (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        }),
        new Promise((resolve, reject) => {
            dbConn.query(query2024, (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        })
    ])
        .then(([result2023, result2024]) => {
            // Send the results as a JSON response
            res.json({
                average2023: result2023.ortalama_2023,
                average2024: result2024.ortalama_2024
            });
        })
        .catch(error => {
            // Handle the error
            console.error('Error:', error);
            res.status(500).send('An error occurred while fetching the data.');
        });
};

const iptalOrani = (req, res) => {

    dbConn.query(`SELECT oda_iptal_log.oda_id, oda_iptal_log.iptal_miktari, oda_iptal_log.tarih
    FROM oda_iptal_log
   ;`, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}


const talepOrani = (req, res) => {
    dbConn.query(`SELECT oda_talep_log.oda_id, oda_talep_log.talep_oranı, oda_talep_log.tarih
    FROM oda_talep_log
   ;`, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}


const fiyatPerformans = (req, res) => {
    const yeni_fiyat = req.body.yeni_fiyat; // assuming the new price is sent in the request body
    const oda_id = req.body.oda_id; // assuming the room id is sent in the request body

    const queries = [
        `
            UPDATE oda_doluluk_log
            SET eski_doluluk_orani = CASE
                    WHEN ? > oda_fiyati THEN eski_doluluk_orani + (? - oda_fiyati) / 5 * 4
                    WHEN ? < oda_fiyati THEN eski_doluluk_orani - (oda_fiyati - ?) / 5 * 4
                    ELSE eski_doluluk_orani
            END,
            oda_fiyati = ?
            WHERE tarih >= '2023-12-01' AND oda_id = ?
        `,
        `
            UPDATE oda_iptal_log
            SET iptal_miktari = CASE
                    WHEN ? > oda_fiyati THEN iptal_miktari - (? - oda_fiyati) / 5 * 0.5
                    WHEN ? < oda_fiyati THEN iptal_miktari + (oda_fiyati - ?) / 5 * 0.5
                    ELSE iptal_miktari
            END,
            oda_fiyati = ?
            WHERE tarih >= '2023-12-01' AND oda_id = ?
        `,
        `
            UPDATE oda_talep_log
            SET talep_oranı = CASE
                    WHEN ? > oda_fiyati THEN talep_oranı + (? - oda_fiyati) / 5 * 4
                    WHEN ? < oda_fiyati THEN talep_oranı - (oda_fiyati - ?) / 5 * 4
                    ELSE talep_oranı
            END,
            oda_fiyati = ?
            WHERE tarih >= '2023-12-01' AND oda_id = ?
        `
    ];

    queries.forEach(query => {
        dbConn.query(query, [yeni_fiyat, yeni_fiyat, yeni_fiyat, yeni_fiyat, yeni_fiyat, oda_id], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('An error occurred');
                return;
            }
        });
    });

    res.status(200).send('Update successful');
};
const queryPromise = (query, params) => {
    return new Promise((resolve, reject) => {
        dbConn.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const karsilastirmaDoluluk = async (req, res) => {
    try {
        const { oda_id } = req.params;
        const result = await queryPromise(
            `SELECT oda_id, tarih, eski_doluluk_orani AS oran, oda_fiyati AS fiyat FROM oda_doluluk_log_updated 
            WHERE oda_doluluk_log_updated.oda_id = ?;`,
            [oda_id]
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const karsilastirmaDoluluk1 = async (req, res) => {
    try {
        const { oda_id } = req.params;
        const result = await queryPromise(
            `SELECT oda_id, tarih, eski_doluluk_orani AS oran, oda_fiyati AS fiyat FROM oda_doluluk_log_previous 
            WHERE oda_doluluk_log_previous.oda_id = ?;`,
            [oda_id]
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const karsilastirmaIptal = async (req, res) => {
    try {
        const { oda_id } = req.params;
        const result = await queryPromise(
            `SELECT oda_id, tarih, iptal_miktari AS oran, oda_fiyati AS fiyat FROM oda_iptal_log_updated 
            WHERE oda_iptal_log_updated.oda_id = ?;`,
            [oda_id]
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const karsilastirmaIptal1 = async (req, res) => {
    try {
        const { oda_id } = req.params;
        const result = await queryPromise(
            `SELECT oda_id, tarih, iptal_miktari AS oran, oda_fiyati AS fiyat FROM oda_iptal_log_previous 
            WHERE oda_iptal_log_previous.oda_id = ?;`,
            [oda_id]
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const karsilastirmaTalep = async (req, res) => {
    try {
        const { oda_id } = req.params;
        const result = await queryPromise(
            `SELECT oda_id, tarih, talep_oranı AS oran, oda_fiyati AS fiyat FROM oda_talep_log_updated 
            WHERE oda_talep_log_updated.oda_id = ?;`,
            [oda_id]
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const karsilastirmaTalep1 = async (req, res) => {
    try {
        const { oda_id } = req.params;
        const result = await queryPromise(
            `SELECT oda_id, tarih, talep_oranı AS oran, oda_fiyati AS fiyat FROM oda_talep_log_previous 
            WHERE oda_talep_log_previous.oda_id = ?;`,
            [oda_id]
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    dolulukOrani,
    dolulukOraniAnaliz,
    iptalOrani,
    talepOrani,
    dolulukOraniKarsilastirma,
    iptalOraniKarsilastirma,
    talepOraniKarsilastirma,
    fiyatPerformans,
    karsilastirmaDoluluk,
    karsilastirmaIptal,
    karsilastirmaTalep,
    karsilastirmaDoluluk1,
    karsilastirmaIptal1,
    karsilastirmaTalep1


}