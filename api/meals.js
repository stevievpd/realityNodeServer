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

router.get("/get-all-product", (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query("SELECT * FROM product", (err, rows, fields) => {
      conn.release();
      if (err) {
        console.log("Failed to get product" + err);
        res.status(500).send("Error occurred");
        return;
      }
      console.log("Fetched product successfully");
      res.status(200).send(rows);
    });
  });
});

router.post("/insert-product", (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query(
      "INSERT INTO product (title, description, price, imageUrl) VALUES (?, ?, ?, ?)",
      [req.body.title, req.body.description, req.body.price, req.body.imageUrl],
      (err, rows, fields) => {
        if (err) {
          console.log("Failed to insert product");
          console.log(err);
          return res.status(500).json({
            error: "Failed to insert product",
          });
        }
        console.log(`Inserted product with title of ${rows.title}`);
        res.status(200).json({
          status: "success",
          message: "inserted successfully",
        });      }
    );
  });
});

router.patch("/edit-product/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query(
      "UPDATE product SET title = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?",
      [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.imageUrl,
        req.params.id,
      ],
      (err, rows, fields) => {
        if (err) {
          console.log("Failed to update product");
          console.log(err);
          return res.status(500).json({
            error: "Failed to update product",
          });
        }
        console.log(`Update meal with id of ${rows.id}`);
        res.status(200).json({
          status: "success",
          message: "updated successfully",
        });
        res.end();
      }
    );
  });
});

router.patch("/delete-product/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query(
      "UPDATE product SET archived = 1 WHERE id = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (err) {
          console.log("Failed to delete product");
          console.log(err);
          return res.status(500).json({
            error: "Failed to delete product",
          });
        }
        console.log(`Deleted product with id of ${rows.id}`);
        res.status(200).json({
          status: "success",
          message: "deleted successfully",
        });
        res.end();
      }
    );
  });
});

module.exports = router;