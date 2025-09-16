function getSqlType(value) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? "BIGINT" : "DOUBLE";
  } else if (typeof value === "boolean") {
    return "BOOLEAN";
  } else if (typeof value === "string") {
    if (value.length <= 255) {
      return "VARCHAR(255)";
    } else if (value.length <= 65535) {
      return "TEXT";
    }
  }
}

// json is a single object
function createSqlTable(tableName, json) {
  const columns = Object.entries(json)
    .map(([key, value]) => `${key} ${getSqlType(value)}`)
    .join(",\n  ");

  return `CREATE TABLE ${tableName} (\n  ${columns}\n);`;
  // Example output: CREATE TABLE country (
  //   id BIGINT,
  //   name VARCHAR(255),
  //   population BIGINT
  // );
}

// json is an array of objects
function createSqlInsert(tableName, json) {
  const columns = Object.keys(json[0]).join(", ");
  const values = Object.values(json)
    .map((item) => {
      const vals = Object.values(item)
        .map((value) => (typeof value === "string" ? `'${value}'` : value))
        .join(", ");
      return `(${vals})`;
    })
    .join(",\n  ");
  return `INSERT INTO ${tableName} (${columns}) \nVALUES \n  ${values}\n;`;
  // Example output: INSERT INTO country (id, name, population)
  // VALUES
  //   (1, 'Germany', 83000000),
  //   (2, 'France', 67000000)
  // ;
}

module.exports = { createSqlTable, createSqlInsert };
