const express = require('express');
const router = express.Router();
const {showLanding,showLogin,showRegister,formLogin,formRegister,getCity,getBusinessPos,logout} = require('../Controllers/landingController');

router.get('/', (req,res)=>{
    showLanding(req,res);
});
router.get('/Home', (req,res)=>{
    res.redirect('/');
});

router.get('/api/City',(req,res)=>{
    getCity(req,res);
});

router.get('/api/BusinessPos',(req,res)=>{
    getBusinessPos(req,res);
});

router.get('/Sellers',(req,res)=>{
    
});

router.get('/Login',(req,res)=>{
    showLogin(req,res);
});

router.get('/Register',(req,res)=>{
    showRegister(req,res);
});

router.post('/Register',(req,res)=>{
    formRegister(req,res);
});

router.post('/Login',(req,res)=>{
    formLogin(req,res);
});
    
router.get('/Logout', (req,res)=>{
    logout(req,res);
});

module.exports = router;