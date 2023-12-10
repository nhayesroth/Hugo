// Backend code structure (simplified)
import sqlite3 from 'sqlite3';

// SQLite database setup (in-memory)
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
    vehicleCount INTEGER CHECK(vehicleCount >= 1 AND vehicleCount <= 3),
    vin TEXT,
    year INTEGER,
    make TEXT,
    model TEXT
  )`);
});

export { db };