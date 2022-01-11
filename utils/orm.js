const { fetch, fetchAll } = require("../database/connect");

const orm = {
    selectAll: function (table, columns = []) {
        const sql = `
        SELECT ${columns.length ? columns.join(", ") : "*"} 
        FROM ${table};
        `;
        return fetchAll(sql);
    },
    selectOne: function (table, condition, columns = []) {
        const sql = `
        SELECT ${columns.length ? columns.join(", ") : "*"}
        FROM ${table}
        WHERE ${condition};
        `;
        return fetch(sql);
    },
    selectMany: function (table, condition, columns = []) {
        const sql = `
        SELECT ${columns.length ? columns.join(", ") : "*"}
        FROM ${table}
        WHERE ${condition}
        `;
        return fetchAll(sql);
    },
    selectSome: function (table, order, options, columns = []) {
        const sql = `
        SELECT ${columns.length ? columns.join(", ") : "*"}
        FROM ${table}
        ORDER BY ${order}
        ${options};
        `;
        return fetchAll(sql);
    },
    insertOne: function (table, data, returningColumn) {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const arr = [];
        for (let i = 1; i <= values.length; i++) {
            arr.push(`$${i}`);
        }
        const sql = `
        INSERT INTO ${table} (
            ${columns.join(", ")}
        ) 
        VALUES (
            ${arr.join(", ")}
        )
        ${returningColumn ? "RETURNING " + returningColumn : ""};
        `;
        return fetch(sql, values);
    },
    updateOne: function (table, data, condition) {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const arr = [];
        let i = 1;
        for (const column of columns) {
            arr.push(`${column} = $${i}`);
            i++;
        }
        const sql = `
        UPDATE ${table}
        SET ${arr.join(", ")}
        WHERE ${condition};
        `;
        return fetch(sql, values);
    },
    deleteOne: function (table, condition) {
        const sql = `
        DELETE FROM ${table}
        WHERE ${condition};
        `;
        return fetch(sql);
    },
};

module.exports = orm;
