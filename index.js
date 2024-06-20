const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
app.use(express.json());
app.use(cors())
var db = require("./database.js")

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/tipoPago/", (req, res) => {
    var sql = "select * from tipoPago"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json(rows)
    })
})

app.get("/recibosPropinas/", (req, res) => {
    var sql = "select * from recibosPropinas"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.json({
            'message': 'success',
            "data": rows
        })
    })
})

app.post("/recibosPropinas", (req, res) => {
    var errors = []
    console.log(req.body.monto)
    if (!req.body.monto) {
        errors.push("No hay monto");
    }
    if (!req.body.tipopago) {
        errors.push("no hay tipopago");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var sql = 'INSERT INTO recibosPropinas (monto, tipopago) VALUES (?,?)'
    var params = [req.body.monto,req.body.tipopago]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": req.body.name,
            "id": this.lastID
        })
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})