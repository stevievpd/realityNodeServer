const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();

const sequelize = require("./util/db");
const errorController = require("./controller/error_controller");
const Product = require("./model/product_model");
const Categories = require("./model/category_model");

//Middlewares
const app = express();
app.use(morgan("short"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
// app.use("/meals", require("./api/meals"));
// app.use("/categories", require("./api/categories"));
// app.use("/order", require("./api/orders"));

app.use("/products", require("./routes/product_routes"));
app.use("/categories", require("./routes/category_routes"));
app.use(errorController.get404);

Product.belongsTo(Categories);

sequelize.sync();

// //Config
// const dbhost = process.env.DB_HOST;
// const dbusername = process.env.DB_USER;
// const dbpass = process.env.DB_PASS;
// const dbname = process.env.DB_DATABASE;

// const pool = mysql.createPool({
//   host: dbhost,
//   user: dbusername,
//   password: dbpass,
//   database: dbname,
// });

const hostname = process.env.ipaddr;
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
