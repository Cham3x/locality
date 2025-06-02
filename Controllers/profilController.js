
const Buyer = require("../Models/Buyer");

async function showInfo(req,res){
    const info = await Buyer.getUserInfo(req);
    res.render('landingView',{isLogged: req.session.userId, role : req.session.role, rows : info ,currentRoute : 'Profil', subRoute : null});
}


module.exports = {showInfo};