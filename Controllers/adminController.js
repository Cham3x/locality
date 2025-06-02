function showAdmin(req,res){
    res.render('landingView',{isLogged: req.session.userId, role : req.session.role, currentRoute : 'Admin'});
}

module.exports = showAdmin;