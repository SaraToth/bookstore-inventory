const pool = require("../pool");

async function getBranches() {
    const { rows } = await pool.query("SELECT name FROM branches");
    return rows;
}

module.exports = { getBranches };