const express = require('express');
const exphbs = require('express-handlebars');
const chalk = require (' chalk');
const BodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Server is running at ${port}`)
    console.log(`URL is : http://localhost${port}`)
})