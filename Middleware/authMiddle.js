function authBuyer(req, res, next){
    if (!req.session.userId || req.session.role != 'buyer') {
        return res.redirect('/');
    }
    next();
}

function authSeller(req, res, next){
    if (!req.session.userId || req.session.role != 'seller') {
        return res.redirect('/');
    }
    next();
}

function authAdmin(req, res, next){
    if (!req.session.userId || req.session.role != 'admin') {
        return res.redirect('/');
    }
    next();
}


module.exports = {authBuyer,authSeller,authAdmin};