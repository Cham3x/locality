const showLanding = require('./Controllers/landingController');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log("Server open on port 3000");
});

app.get('/', showLanding);