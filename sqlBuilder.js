function getSqlType(value) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? "INT" : "FLOAT";
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

function createSqlTable(tableName, json) {
  const columns = Object.entries(json)
    .map(([key, value]) => `${key} ${getSqlType(value)}`)
    .join(",\n  ");

  return `CREATE TABLE ${tableName} (\n  ${columns}\n);`;
}

function createSqlInsert(tableName, json) {
  const columns = Object.keys(json[0]).join(", ");
  const values = Object.values(json)
    .map((row) => {
      const vals = Object.values(row)
        .map((value) => (typeof value === "string" ? `'${value}'` : value))
        .join(", ");
      return `(${vals})`;
    })
    .join(",\n  ");
  return `INSERT INTO ${tableName} (${columns}) \nVALUES (\n  ${values}\n);`;
}

module.exports = { createSqlTable, createSqlInsert };
