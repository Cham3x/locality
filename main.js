const {authBuyer,authSeller,authAdmin} = require('./Middleware/authMiddle');
const routeLanding = require('./Routes/routeLanding');
const routeProfil = require('./Routes/routeProfil');
const routeManage = require('./Routes/routeManage');
const routeAdmin = require('./Routes/routeAdmin');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(session({
    secret: 's2A5dfOP8930xwafvx5185sereRPw9634752PAMMLlncd89eeza6',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', routeLanding);
app.use('/Profil', authBuyer, routeProfil);
app.use('/Manage', authSeller, routeManage);
app.use('/Admin', authAdmin, routeAdmin);


app.listen(3000, () => {
    console.log("Server open on port 3000");
});

