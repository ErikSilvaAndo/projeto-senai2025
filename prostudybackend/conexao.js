// require('dotenv').config();
// const { Pool } = require('pg');

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

let sql;

if (!global._sql) {
    global._sql = postgres(process.env.DATABASE_URL + "?sslmode=require", {
        max: 1,
        idle_timeout: 20
    });
}

sql = global._sql;

export default sql;
