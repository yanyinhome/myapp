var mysql=require("mysql");
var connection=mysql.createConnection({
    host:"fopuxa8s.2318.dnstoo.com",
    user:"danzhu0909_f",
    password:"danzhu123",
    port:"5509",
    database:"danzhu0909",
})
connection.connect()
connection.query('SELECT * FROM websites', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    });
connection.end();