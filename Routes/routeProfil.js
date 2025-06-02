const express = require('express');
const router = express.Router();
const {showInfo} = require('../Controllers/profilController');

router.get('/', (req,res)=>{
    showInfo(req,res);
 });

 router.get('/Myinfos', (req,res)=>{
    showInfo(req,res);
 });

 module.exports = router;