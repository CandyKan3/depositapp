var express = require('express');
var app = express();
var router = express.Router();
  var mysql = require('mysql');
  const bodyParser = require('body-parser');
  app.use(bodyParser.json())

/* GET home page. */
const API_PORT = 5000;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
router.post('/update', function(req, res, next) {
  console.log(req.body);
  let a = req.body.email;
  let b = req.body.date;
  let c = req.body.sessions;
  let d = req.body.deposits;
  let e = req.body.notes;
  console.log(a, b , c, d, e);

var con = mysql.createConnection({
  host: "206.189.182.37",
  user: "root",
  password: "TattooPassword321!",
  database: "deposits"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "UPDATE client SET email=?, date=?, amount=?, sessions=?, notes=? WHERE email=?";
  console.log(sql, d);
 con.query(sql,[a,b,d,c,e, a], function (err, result) {
   if (err) throw err;
   console.log("1 record updated");
 });
});
  res.redirect("/menu");
});
router.post('/meeting', function(req, res, next) {
  console.log(req.body);
  let a = req.body.email;
  let b = req.body.date;
  let c = req.body.sessions;
  let d = req.body.deposits;
  let e = req.body.notes;
  console.log(a, b , c, d, e);

var con = mysql.createConnection({
  host: "206.189.182.37",
  user: "root",
  password: "TattooPassword321!",
  database: "deposits"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO client(email, date, amount, sessions, notes) VALUES (?,?,?,?,?)";
  console.log(sql, d);
 con.query(sql,[a,b,d,c,e], function (err, result) {
   if (err) throw err;
   console.log("1 record inserted");
 });
});
  res.redirect("/menu");
});
router.post('/total', function(req, res, next) {
  console.log(req.body);
  let a = req.body.email;
  let b = req.body.sessions;
  b = (b-1);
if(b!=0){

var con = mysql.createConnection({
  host: "206.189.182.37",
  user: "root",
  password: "TattooPassword321!",
  database: "deposits"
});

con.connect(function(err) {
  if (err) throw err;

  var sql = "UPDATE client SET sessions=? WHERE email=?";
  console.log(sql, b);
 con.query(sql,[b, a], function (err, result){
   if (err) throw err;
   console.log(result);
res.json({'test' :result});
 });

});
}
else{
  var con = mysql.createConnection({
    host: "206.189.182.37",
    user: "root",
    password: "TattooPassword321!",
    database: "deposits"
  });

  con.connect(function(err) {
    if (err) throw err;

    var sql = "DELETE FROM client WHERE email=?";
    console.log(sql, a);
   con.query(sql,[a], function (err, result){
     if (err) throw err;
     console.log(result);
res.json({'test' :result});
   });

  });
}
});
router.post('/delete', function(req, res, next) {
  console.log(req.body);
  let a = req.body.email;

  var con = mysql.createConnection({
    host: "206.189.182.37",
    user: "root",
    password: "TattooPassword321!",
    database: "deposits"
  });

  con.connect(function(err) {
    if (err) throw err;

    var sql = "DELETE FROM client WHERE email=?";
    console.log(sql, a);
   con.query(sql,[a], function (err, result){
     if (err) throw err;
     console.log(result);
res.json({'test' :result});
   });

  });

});
router.post('/checkout', function(req, res, next) {
  console.log(req.body);
  let a = req.body.email;

  console.log(a);

var con = mysql.createConnection({
  host: "206.189.182.37",
  user: "root",
  password: "TattooPassword321!",
  database: "deposits"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM client WHERE email=?";
  console.log(sql, a);
 con.query(sql,[a], function (err, result){
   if (err) throw err;
   console.log(result);
   res.json({title: result});
 });
});

});
router.get('/checkout', function(req, res, next) {
  var con = mysql.createConnection({
    host: "206.189.182.37",
    user: "root",
    password: "TattooPassword321!",
    database: "deposits"
});

con.connect(async function(err) {
  let promise = new Promise((resolve, reject) => {
    if (err) throw err;
    con.query("SELECT * FROM client", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
  res.send(result);
    });

 });


});
});


app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
