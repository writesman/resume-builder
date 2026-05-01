const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const strDbPath = path.join(__dirname, '../database/resume.sqlite');

// Ensure database directory exists
const strDbDir = path.dirname(strDbPath);
if (!fs.existsSync(strDbDir)) {
    fs.mkdirSync(strDbDir, { recursive: true });
}

const objDb = new sqlite3.Database(strDbPath, (objErr) => {
    if (objErr) {
        console.error('Error opening database', objErr.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Enable foreign keys
        objDb.run('PRAGMA foreign_keys = ON');

        // Initialize schema
        const strSchemaPath = path.join(__dirname, '../database/schema.sql');
        if (fs.existsSync(strSchemaPath)) {
            const strSchema = fs.readFileSync(strSchemaPath, 'utf8');
            objDb.exec(strSchema, (objSchemaErr) => {
                if (objSchemaErr) {
                    console.error('Error executing schema', objSchemaErr.message);
                } else {
                    console.log('Database schema initialized.');
                }
            });
        }
    }
});

module.exports = objDb;
