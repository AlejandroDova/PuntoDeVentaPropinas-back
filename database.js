var sqlite3 = require('sqlite3').verbose()
// var md5 = require('md5') 

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`
            CREATE TABLE tipoPago (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre text, 
                numero INTEGER 
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO tipoPago (nombre, numero) VALUES (?,?)'
                db.run(insert, ["efectivo", 0])
                db.run(insert, ["BBVA",1212])
                db.run(insert, ["santander",1234])
            }
        });
        db.run(`
            CREATE TABLE recibosPropinas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                monto INTEGER,
                tipopago INTEGER,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO recibosPropinas (monto, tipopago) VALUES (?,?)'
                db.run(insert, [300, 1])
                db.run(insert, [300, 2])
            }
        });  
    }
});


module.exports = db
