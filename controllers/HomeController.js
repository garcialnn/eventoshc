var mysql = require('mysql');
var bcrypt = require('bcryptjs');
module.exports = {
  index : function(req, res, next){
    
    var config = require('.././database/config');
    var db = mysql.createConnection(config); 

    db.connect();
    db.query('SELECT * FROM eventos ORDER BY fechainicio DESC', function(err, rows, fields){
      if(err) throw err;
      res.render('users/panel', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user,
        resultados: rows
      });
      db.end();
    });
  }
}
