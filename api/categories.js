const express = require("express");
const mysql = require("mysql");
const router = express.Router();
require("dotenv").config();

const dbhost = process.env.DB_HOST;
const dbusername = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbname = process.env.DB_DATABASE;

const pool = mysql.createPool({
    host: dbhost,
    user: dbusername,
    password: dbpass,
    database: dbname,
});

router.get("/get-all-categories", (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM categories", (err, rows, fields) => {
            conn.release();
            if (err) {
                console.log("Failed to get categories" + err);
                res.status(500).send("Error occurred");
                return;
            }
            console.log("Fetched meals successfully");
            res.status(200).send(rows);
        });
    });
});


module.exports = router;