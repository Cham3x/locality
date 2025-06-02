const bcrypt = require('bcryptjs');
const db = require("../Bdd/db");
const Buyer = require("../Models/Buyer");
const Seller = require("../Models/Seller");
const Business = require("../Models/Business");

async function showLanding(req,res){
    const category = await Business.getAllCategory();
    if(req.session.role){
        res.render('landingView',{isLogged: req.session.userId, role : req.session.role, rows : category,currentRoute : 'Home'});
    }else{
        res.render('landingView',{isLogged: null, role : null, rows : category, locations : null ,currentRoute : null});
    }
}

async function getBusinessPos(req,res){
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Coordonnées manquantes' });
    }
  
    const radius_km = 10; // rayon de recherche
  
    const query = `
      SELECT id, name, latitude, longitude,
        (
          6371 * acos(
            cos(radians(?)) *
            cos(radians(latitude)) *
            cos(radians(longitude) - radians(?)) +
            sin(radians(?)) *
            sin(radians(latitude))
          )
        ) AS distance
      FROM sellers
      HAVING distance < ?
      ORDER BY distance
      LIMIT 50;
    `;
  
    try {
      const [rows] = await db.query(query, [lat, lng, lat, radius_km]);
      res.json(rows);
    } catch (err) {
      console.error('Erreur SQL :', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
}

 async function getCity(req,res){
    let search = req.query.q;
    try{
    if (!search) {
        return res.json([]);
    }

    let query = "SELECT ville_nom_reel, ville_latitude_deg, ville_longitude_deg, ville_code_postal FROM villes_france_free WHERE ville_nom_reel LIKE ? LIMIT 5";
    let values = [`${search}%`];

    const [results] = await db.query(query, values);
        if (!results) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
        console.log('from getCity()'+results);
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
 }


function showLogin(req,res){
    res.render('loginView');
}

function showRegister(req,res){
    res.render('registerView',{successMessage : null, errorMessage: null});
}

async function formLogin(req,res){
    const { email, password } = req.body;

    try {
        const [results] = await db.query("SELECT id, password, role FROM users WHERE email = ?", [email]);

        if (results.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        req.session.userId = user.id;
        req.session.role = user.role;

        console.log(req.session);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

async function formRegister(req,res){
    const { name, lastname, password, confirmed_password, email, adresse, city, lat, lon, cp, tel, birth_date, role } = req.body;

    try {
        let user;
        if (role === "buyer") {
            user = new Buyer( null, name, lastname, password, email, adresse, city, lat, lon, cp, tel, birth_date, role);
        } else {
            user = new Seller(  null, name, lastname, password, email, adresse, city, lat, lon ,cp, tel, birth_date, role);
        }

        await user.register();
        res.render('registerView',{successMessage : 'Registred with success ! ', errorMessage: null});
    } catch (err) {
            console.log(err);
        res.render('registerView',{successMessage : null, errorMessage: 'Something went wrong ! '});
    }
}

function logout(req,res){
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
            res.status(400).send('error');
        } else {
            res.redirect('/');
            res.end();
        }
      });
    }
  }
module.exports = {showLanding,showLogin,showRegister,formLogin,formRegister,getCity,getBusinessPos,logout};