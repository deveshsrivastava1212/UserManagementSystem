const express = require('express');
const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');
const mysql = require('mysql');

//port
const port = process.env.PORT || 5000;

require('dotenv').config();
const app = express();

//Parsing Middleware
//parse application urlencoded
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//add static feature
app.use(express.static('public'))

// Templating Engine
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine','hbs');

//connect DATABASE
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.HOST,
    user            : process.env.USER,
    password        : process.env.PASSWORD,
    database        : process.env.NAME
})

pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
})

const router = require('./server/routes/user');
app.use('', router);

app.listen(port, ()=> {
    console.log(`Server is running at ${port}`)
    console.log(`URL is : http://localhost:${port}`)
})