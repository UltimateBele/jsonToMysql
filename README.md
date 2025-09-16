# JSON to MySql

Converts a simple JSON File to one MySql CREATE TABLE and INSERT statement.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Generate SQL only](#generate-sql-only)
  - [Execute SQL (write to DB)](#execute-sql-write-to-db)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Features
- Accept JSON or array of JSON objects as input
- Generate SQL `CREATE TABLE` + `INSERT` statements
- Optional execution: write SQL to a MySQL database
- Uses environment variables for database credentials
- Optional ability to just return the SQL without executing

---

## Installation

```bash
git clone https://github.com/UltimateBele/jsonToMysql.git
cd jsonToMysql
npm install
npm run dev
```
---

## Configuration
Create an .env file, for example:
```env
MYSQL_HOST=...
MYSQL_USER=...
MYSQL_PASSWORD=...
MYSQL_NAME=...
```

---

## Usage
**Generate SQL only**
Send a POST request to /sql without the execute=true query param, e.g.:

```bash
curl -X POST http://localhost:8080/sql?tableName=mytable \
  -H "Content-Type: application/json" \
  -d '[{"foo": "bar", "baz": 123}]'
```
This returns the SQL statements (CREATE + INSERT).

**Execute SQL (write to DB)**
Use execute=true:
```bash
curl -X POST http://localhost:8080/sql?tableName=mytable&execute=true \
  -H "Content-Type: application/json" \
  -d '[{"foo": "bar", "baz": 123}]'
```
This will run the SQL against the DB configured via .env.

---

## API Endpoints
| Endpoint | Method | Params / Query                    | Body                 | Description                  |
| -------- | ------ | --------------------------------- | -------------------- | ---------------------------- |
| `/sql`   | POST   | `tableName`, `execute=true/false` | JSON object or array | Generate SQL or also execute |

---

## License
**MIT**
