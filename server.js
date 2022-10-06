const express = require('express')
const path =  require('path')
const db = require('./mongodb')
const port = process.env.PORT || 8080
let app = express()
const route = require('./routes/index.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'index.html'));

db();

app.use(express.static(path.join(__dirname, 'html')));
app.use('/', route);

app.listen(port, () => {
    console.log(`http://localhost:${port} <-- here`);
})

