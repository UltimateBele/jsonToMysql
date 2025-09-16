const express = require("express");
const app = express();
const port = 8080;

const { createSqlTable, createSqlInsert } = require("./sqlBuilder");

app.use(express.json());

app.get("/sql", (req, res) => {
  console.log(new Date());

  if (!req.is("application/json"))
    return res.status(400).send("Content-Type must be application/json");

  const json = Array.isArray(req.body) ? req.body : [req.body];
  if (!Array.isArray(json) || json.length === 0) {
    return res.status(400).send("Invalid JSON data");
  }

  const tableName = req.query.tableName || "no_name_provided";

  const tableSQL = createSqlTable(tableName, json[0]);
  const insertSQL = createSqlInsert(tableName, json);
  res.type("text/plain").send(`${tableSQL}\n\n${insertSQL}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
