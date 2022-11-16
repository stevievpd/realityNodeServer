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

router.get("/get-all-meals", (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query("SELECT * FROM meals", (err, rows, fields) => {
      conn.release();
      if (err) {
        console.log("Failed to get meals" + err);
        res.sendStatus(500);
        res.end();
        return;
      }
      console.log("Fetched meals successfully");
      res.send(rows);
      res.end();
    });
  });
});

router.post("/insert-meal", (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query(
      "INSERT INTO meals (title, description, price, imageUrl) VALUES (?, ?, ?, ?)",
      [req.body.title, req.body.description, req.body.price, req.body.imageUrl],
      (err, rows, fields) => {
        if (err) {
          console.log("Failed to insert meal");
          console.log(err);
          return res.status(500).json({
            error: "Failed to insert meal",
          });
        }
        console.log(`Inserted meal with title of ${rows.title}`);
        res.status(200).json({
          status: "success",
          message: "inserted successfully",
        });
        res.end();
      }
    );
  });
});

router.patch("/edit-meal/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query(
      "UPDATE meal SET title = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?",
      [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.imageUrl,
        req.params.id,
      ],
      (err, rows, fields) => {
        if (err) {
          console.log("Failed to update meal");
          console.log(err);
          return res.status(500).json({
            error: "Failed to update meal",
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

router.patch("/delete-meal/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query(
      "UPDATE meal SET archived = 1 WHERE id = ?",
      [req.params.id],
      (err, rows, fields) => {
        if (err) {
          console.log("Failed to delete meal");
          console.log(err);
          return res.status(500).json({
            error: "Failed to delete meal",
          });
        }
        console.log(`Deleted meal with id of ${rows.id}`);
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