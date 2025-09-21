const mysql = require("mysql2");
require("dotenv").config();

async function writeToDatabase(...sql) {
  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const database = process.env.MYSQL_DATABASE;

  const pool = mysql
    .createPool({
      host: host,
      user: user,
      password: password,
      database: database,
    })
    .promise();

  try {
    sql.forEach(async (query) => {
      const [results] = await pool.query(query);
      console.log("Successfully wrote to database:", results);
    });
  } catch (error) {
    console.error("Error writing to database:", error);
  }
}

module.exports = { writeToDatabase };
