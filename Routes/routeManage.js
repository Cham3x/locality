const express = require('express');
const router = express.Router();
const {showUserInfo,showBusinessInfo,registerBusiness,showAddBusinessForm,showForm,showAddProductForm,registerProduct,showDelUpdtForm,updateProduct,deleteProduct} = require('../Controllers/manageController');

router.get('/', (req,res)=>{
    showUserInfo(req,res);
 });

router.get('/Myinfos', (req,res)=>{
     showUserInfo(req,res);
});



router.get('/Myproducts', (req,res)=>{
    showForm(req,res);
 });

 router.post('/Myproducts/delP', (req,res)=>{
   deleteProduct(req,res);
});

 router.post('/Myproducts/updtPf', (req,res)=>{
    showDelUpdtForm(req,res);
 });

 router.post('/Myproducts/updtP', (req,res)=>{
    updateProduct(req,res);
 });
router.post('/Myproducts/addPf', (req,res)=>{
    showAddProductForm(req,res);
 });

 router.post('/Myproducts/addP', (req,res)=>{
    registerProduct(req,res);
 });

router.get('/Mybusiness', (req,res)=>{
   showBusinessInfo(req,res);
});

router.get('/Mybusiness/addB', (req,res)=>{
    showAddBusinessForm(req,res);
 });

router.post('/Mybusiness/addB', (req,res)=>{
    registerBusiness(req,res);
});

 module.exports = router;