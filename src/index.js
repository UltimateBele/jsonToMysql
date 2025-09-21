const express = require("express");
const { createSqlTable, createSqlInsert } = require("./sqlBuilder");
const { writeToDatabase } = require("./database");

const app = express();
const port = 8080;

app.use(express.json());

app.post("/sql", async (req, res) => {
  console.log(new Date());

  if (!req.is("application/json"))
    return res.status(400).send("Content-Type must be application/json");

  const json = Array.isArray(req.body) ? req.body : [req.body];
  if (json.length === 0) {
    return res.status(400).send("Invalid JSON data");
  }

  const tableName = req.query.tableName || "no_name_provided";

  const tableSQL = createSqlTable(tableName, json[0]);
  const insertSQL = createSqlInsert(tableName, json);

  const execute = req.query.execute === "true";
  if (execute) {
    try {
      await writeToDatabase(tableSQL, insertSQL);
      res.type("text/plain").send(`SQL executed successfully:\n${insertSQL}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to execute SQL");
    }
  } else {
    res.type("text/plain").send(`${tableSQL}\n\n${insertSQL}`);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
