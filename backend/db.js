const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("✅ Connected to the database!");
    }
});

// Export the db connection
module.exports = db;
