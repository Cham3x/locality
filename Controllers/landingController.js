const landingView = require('../Views/landingView');

function showLanding(req,res){
    res.send(landingView())
}

module.exports = showLanding;