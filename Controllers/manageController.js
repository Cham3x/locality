//const db = require("../Bdd/db");
const Seller = require("../Models/Seller");
const Business = require("../Models/Business");
const Product = require("../Models/Product");

async function showUserInfo(req,res){
    const info = await Seller.getUserInfo(req);
   
    res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : info , currentRoute : 'Manage', subRoute : null});
}

async function showAddBusinessForm(req,res){
    const category = await Business.getAllCategory();
    res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : category , currentRoute : 'Manage', subRoute : 'addB'});
}

async function showForm(req,res){
    const idBusiness = await Product.getBusinessAddress(req);
    res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : idBusiness , currentRoute : 'Manage', subRoute : 'Myproducts'});
}



async function showAddProductForm(req,res){
    const {sellerId,add,show} = req.body;
   if(add === '1'){
    const data = {sellerId};
   
    res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : data , currentRoute : 'Manage', subRoute : 'addPf'});
   }else if(show === '1'){
        const productInfo = await Product.getProductInfoBySellerId(sellerId);
        if(productInfo.length > 0){
             
        res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : productInfo , currentRoute : 'Manage', subRoute : 'showP'});
        }else{
            
            res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : null , currentRoute : 'Manage', subRoute : 'showP'});
        }
    }
    
}

async function showDelUpdtForm(req,res){
    const {productId,update,del} = req.body;
    if(update === '1'){
        const updateFormData = await Product.getProductInfoByProductId(productId);
        res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : updateFormData , message : null,currentRoute : 'Manage', subRoute : 'updtPf'});
    }else if(del === '1'){
        const deleteFormData = await Product.getProductInfoByProductId(productId);
        res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : deleteFormData , message : null,currentRoute : 'Manage', subRoute : 'delPf'});
    }
}

async function deleteProduct(req,res){
    const {productId,sellerId} = req.body;
    const result = await Product.deleteProduct(productId);
    
    if(result.affectedRows > 0){
        const productInfo = await Product.getProductInfoBySellerId(sellerId);
        if(productInfo.length > 0){
             
        res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : productInfo , currentRoute : 'Manage', subRoute : 'showP'});
        }else{
            
            res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : null , currentRoute : 'Manage', subRoute : 'showP'});
        }
    }
}

   async function updateProduct (req, res) {
    try {
      const {productId} = req.body;
      const updatedFields = {};
  
      const allowedFields = ['name', 'cat', 'price', 'stock', 'click', 'delivery', 'desc'];
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined && req.body[field] !== '') {
          updatedFields[field] = req.body[field];
        }
      });
      let updateFormData;
      const result = await Product.updateProduct(productId, updatedFields);
      if (result.affectedRows > 0) {
         updateFormData = await Product.getProductInfoByProductId(productId);
        res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : updateFormData , message : 'Product updated with success ! ', currentRoute : 'Manage', subRoute : 'updtPf'});
        
      } else {
        updateFormData = await Product.getProductInfoByProductId(productId);
        res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : updateFormData , message : 'Error something went wrong ! ', currentRoute : 'Manage', subRoute : 'updtPf'});
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



async function registerProduct(req,res){
    const {name, desc, cat, price, stock, sellerId} = req.body;
    let {click,delivery} = req.body;
    try{
            if(click != '1'){
                click = 0;
            }
            if(delivery != '1'){
                delivery = 0;
            }
            const product = new Product(null,name,desc,cat,price,stock,click,delivery,sellerId);
            const result = await product.regProduct();
            
            if(result){
               res.redirect('/Manage/Myproducts'); 
            }
            
        }catch(err){
            console.log(err);

            res.render('landingView',{isLogged: req.session.userId, role : req.session.role,  rows : null , currentRoute : 'Manage', subRoute : 'Myproducts'});
        }
}



async function showBusinessInfo(req,res){
    const infoBusiness = await Business.getBusinessInfo(req);
    console.log(infoBusiness);
    res.render('landingView',{isLogged: req.session.userId, role : req.session.role, rows : infoBusiness , currentRoute : 'Manage', subRoute : 'Mybusiness'});
}

async function registerBusiness(req,res){
   const {name, desc, cat, address, city, lat, lon , cp, tel, email, kbis} = req.body;
   let {click, delivery} = req.body;
    try
    {
        console.log(click);
        if(click != '1'){
            click = 0;
        }
        if(delivery != '1'){
            delivery = 0;
        }
        const business = new Business(null, name, desc, cat, address, city, lat, lon, cp ,tel, email, click, delivery, kbis);
        const result = await business.regBusiness(req);
        console.log(click);
        console.log(delivery);
        if(result){
            res.redirect('/Manage/Mybusiness');
        }
        
    }catch(err)
    {
        console.log(err);
        res.render('landingView',{isLogged: req.session.userId, role : req.session.role, rows : null , currentRoute : 'Manage', subRoute : 'Mybusiness'});
    }
       
}

module.exports = {showUserInfo,showBusinessInfo,registerBusiness,showAddBusinessForm,showForm,showAddProductForm,registerProduct,showDelUpdtForm,updateProduct,deleteProduct};