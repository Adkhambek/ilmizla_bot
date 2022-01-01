const { Pool } = require("pg");
const { dbUrl } = require("../config");
const pool = new Pool({
    connectionString: dbUrl,
});

exports.fetch = async (query, ...values) => {
    const client = await pool.connect();
    try {
        const {
            rows: [row],
        } = await client.query(query, values.length ? values : null);
        return row;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
};

exports.fetchAll = async (query, ...values) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(
            query,
            values.length ? values : null
        );
        return rows;
    } catch (error) {
        console.log(error);
    } finally {
        client.release();
    }
};
