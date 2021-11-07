const express= require('express');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.HOST,
    user            : process.env.USER,
    password        : process.env.PASSWORD,
    database        : process.env.NAME
})

exports.views = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log(`Connected as ID ${connection.threadId}`);
        connection.query('SELECT * FROM users WHERE status= "active"', (err, rows) => {
            //When connection is done, release it
            connection.release();
            if(!err) {
                res.render('home', {rows});
            } 
            else{
                console.log(err);
            }
            // console.log("The Data of a user is :", rows);
        })  
    })
}

// to find the user by searching
exports.find = (req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log(`Connected as ID ${connection.threadId}`);
        let search = req.body.search;
        connection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ? ', ['%'+ search +'%', '%'+ search +'%', '%'+ search +'%', '%'+ search +'%'], (err, rows) => {
            //When connection is done, release it
            connection.release();
            if(!err) {
                res.render('home', {rows});
            } 
            else{
                console.log(err);
            }
            console.log("The Data of a user is :", rows);
        })        
    })
}

//Rendering the new user form
exports.add = (req,res) => {
    res.render('add_user');
}


//TO create new user using form submission
exports.create = (req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log(`Connected as ID ${connection.threadId}`);
        let first = req.body.first_name;
        let last = req.body.last_name;
        let email = req.body.email;
        let phone = req.body.phone;
        let comments = req.body.comments;
        connection.query('INSERT INTO users SET first_name = ? , last_name = ?, email= ?, phone =? , comments=?',[first, last, email, phone, comments], (err, rows) => {
            //When connection is done, release it
            connection.release();
            if(!err) {
                res.render('add_user', {alert: 'alert'});
            } 
            else{
                console.log(err);
            }
            // console.log("The Data of a user is :", rows);
        })        
    })
}

//TO view edit page and user information
exports.edit = (req,res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        //When connection is done, release it
        connection.release();
        if(!err) {
            res.render('edit_user', {rows});
        } 
        else{
            console.log(err);
        }
        // console.log("The Data of a user is :", rows);
    })  
})
}

//To update the user information
exports.update = (req,res) => {
    const {first_name, last_name, email, phone, comments} = req.body;
    pool.getConnection((err, connection) => {
      if(err) throw err;
      console.log(`Connected as ID ${connection.threadId}`);
      connection.query('UPDATE users SET first_name = ? , last_name = ?, email= ?, phone =? , comments=? WHERE id = ?', [first_name,last_name, email, phone, comments ,req.params.id], (err, rows) => {
          //When connection is done, release it
          connection.release();
          if(!err) {
            pool.getConnection((err, connection) => {
                if(err) throw err;
                console.log(`Connected as ID ${connection.threadId}`);
                connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
                    //When connection is done, release it
                    connection.release();
                    if(!err) {
                        res.render('edit_user', {rows, alert: 'alert'});
                    } 
                    else{
                        console.log(err);
                    }
                    // console.log("The Data of a user is :", rows);
                })  
            })
          } 
          else{
              console.log(err);
          }
          // console.log("The Data of a user is :", rows);
      })  
  })
  }

  //TO delete the user 
exports.delete = (req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log(`Connected as ID ${connection.threadId}`);
        connection.query('UPDATE users SET status = ? WHERE id =? ', ['removed' ,req.params.id], (err, rows) => {
            //When connection is done, release it
            connection.release();
            if(!err) {
                res.redirect('/');
            } 
            else{
                console.log(err);
            }
            // console.log("The Data of a user is :", rows);
        })  
    })
  }

  //To view all details of user
exports.viewall = (req, res) => {
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
    connection.query('SELECT * FROM users WHERE id=?', [req.params.id], (err, rows) => {
        //When connection is done, release it
        connection.release();
        if(!err) {
            res.render('view_user', {rows});
        } 
        else{
            console.log(err);
        }
        // console.log("The Data of a user is :", rows);
    })  
})
}
  