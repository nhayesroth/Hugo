import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`CREATE TABLE InsuranceApplication (
    id INTEGER PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    dob TEXT, 
    street TEXT,
    city TEXT,
    state TEXT,
    zipCode INTEGER,
    vin1 TEXT,
    year1 INTEGER,
    make1 TEXT,
    model1 TEXT,
    vin2 TEXT,
    year2 INTEGER,
    make2 TEXT,
    model2 TEXT,
    vin3 TEXT,
    year3 INTEGER,
    make3 TEXT,
    model3 TEXT
  )`);
});

export { db };
