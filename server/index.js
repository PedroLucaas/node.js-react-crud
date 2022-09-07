const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pedrostore",
});

app.use(express.json());
app.use(cors());

app.post("/register", (requisition, response) => {
  const { name } = requisition.body;
  const { cost } = requisition.body;
  const { category } = requisition.body;

  let query = "INSERT INTO products ( name, cost, category) VALUES (?, ?, ?)";
  db.query(query, [name, cost, category], (error, result) => {
    response.send(result);
  });
});

app.post("/search", (requisition, response) => {
  const { name } = requisition.body;
  const { cost } = requisition.body;
  const { category } = requisition.body;

  let query =
    "SELECT * from products WHERE name = ? AND cost = ? AND category = ?";
  db.query(query, [name, cost, category], (error, result) => {
    if (error) response.send(error);
    response.send(result);
  });
});

app.get("/getCards", (requisition, response) => {
  let query = "SELECT * FROM products";
  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      response.send(result);
    }
  });
});

app.put("/edit", (requisition, response) => {
  const { id } = requisition.body;
  const { name } = requisition.body;
  const { cost } = requisition.body;
  const { category } = requisition.body;
  let query = "UPDATE products SET name = ?, cost = ?, category = ? WHERE id = ?";
  db.query(query, [name, cost, category, id], (error, result) => {
    if (error) {
      response.send(error);
    } else {
      response.send(result);
    }
  });
});

app.delete("/delete/:id", (requisition, response) => {
  const { id } = requisition.params;
  let query = "DELETE FROM products WHERE id = ?";
  db.query(query, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      response.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
