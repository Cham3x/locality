const express = require('express');
const router = express.Router();
const showAdmin = require('../Controllers/adminController');

router.get('/', (req,res)=>{
    showAdmin(req,res);
 });

 module.exports = router;