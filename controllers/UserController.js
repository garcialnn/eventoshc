var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = {

  getSignUp : function(req, res, next){
    return res.render('users/signup');
  },

  postSignUp: function(req, res, next){
    
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(req.body.password, salt);

    var user = {
      email : req.body.email,
      nombre : req.body.nombre,
      password : password
    };

    var config = require('.././database/config');

    var db = mysql.createConnection(config);

    db.connect();

    db.query('INSERT INTO users SET ?', user, function(err, rows, fields){
      if(err) throw err;

      db.end();
    });
    req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
    return res.redirect('/auth/signin');
  },

  getSignIn: function(req, res, next){
    return res.render('users/signin', {message: req.flash('info'), authmessage : req.flash('authmessage')});
  },

  logout : function(req, res, next){
    req.logout();
    res.redirect('/auth/signin');
  },

  getUserPanel : function(req, res, next){
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
  },

  postEvento : function(req, res, next){
    var config = require('.././database/config');
    var db = mysql.createConnection(config); 
    var nevento = req.body.nevento;
    db.connect();
    db.query('SELECT * FROM eventos WHERE id='+nevento, function(err, rows, fields){
      if(err) throw err;
      res.render('users/evento', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user,
        datos: rows
      });
    db.end();
    });
  }
};