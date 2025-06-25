const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title TEXT NOT NULL,
        author TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS branches (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        book_id INTEGER,
        branch_id INTEGER,
        stock INTEGER
    );

    INSERT INTO books (title, author)
    VALUES ('Harry Potter and the Philosopher''s Stone', 'J. K. Rowling'),
    ('The Notebook', 'Nicholas Sparks'),
    ('Atomic Habits', 'James Clear'),
    ('New York', 'Edward Rutherford'),
    ('I''m Glad My Mom Died', 'Jennette McCurdy'),
    ('The Great Gatsby', 'F Scott Fitzgerald');

    INSERT INTO branches (name)
    VALUES ('Hongdae'), ('Gangnam'), ('Gwanghwamoon');

    INSERT INTO inventory (book_id, branch_id, stock)
    SELECT books.id, branches.id, 0
    FROM books
    CROSS JOIN branches;

    CREATE VIEW book_branch_stock AS
    SELECT books.title, books.author,
    SUM(CASE WHEN branches.name = 'Hongdae' THEN inventory.stock ELSE 0 END) AS "Hongdae",
    SUM(CASE WHEN branches.name = 'Gangnam' THEN inventory.stock ELSE 0 END) AS "Gangnam",
    SUM(CASE WHEN branches.name = 'Gwanghwamoon' THEN inventory.stock ELSE 0 END) AS "Gwanghwamoon"
    FROM books
    INNER JOIN inventory ON books.id = inventory.book_id
    INNER JOIN branches ON inventory.branch_id = branches.id
    GROUP BY books.title, books.author;
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();