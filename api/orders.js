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

router.post("/insert-order", (req, res) => {
    pool.getConnection((err, conn) => {
        var lastInsertedId;
        conn.query("INSERT INTO orders (amount, date_time) VALUES (?, NOW())", [req.body.amount], (err, results, fields) => {
            if (err) {
                return res.status(500).json({
                    error: "Failed to query insert order",
                });
            } else {
                lastInsertedId = results.insertId;
                for (var i in req.body.products) {
                    conn.query("INSERT INTO order_product (order_id, product_id) VALUES (?, ?)", [lastInsertedId, req.body.products[i].id], (err, rows, fields) => {
                        if (err) {
                            console.log("Failed to insert into order_product");
                            console.log(err);
                            return res.status(500).json({
                                error: "Failed to insert to order_product"
                            })
                        }
                    });
                }
            }
            res.status(200).json({
                success: "Success"
            })
        });
    });
});

module.exports = router;