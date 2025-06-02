const Users = require("./Users");
const db = require("../Bdd/db");
const bcrypt = require("bcryptjs");

class Seller extends Users {

    async register() {
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const query = "INSERT INTO users (name, lastname, password, email, adresse, city, latitude, longitude, code_postal, tel, birth_date, date_reg, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'seller')";
        const [results] = await db.query(query,[this.name, this.lastname, hashedPassword, this.email, this.adresse, this.city, this.lat, this.lon, this.code ,this.tel, this.birth_date, formattedDate ]); 
        return results;          
                 
    }

   static async getUserInfo(req){
        const query ="SELECT name,lastname,email,adresse,code_postal,tel,birth_date,date_reg FROM users WHERE id = ? ";
        const [results] = await db.query(query, [req.session.userId]);
            let dataSplit = results[0].date_reg.toString().split(" ");// formattage date
            const data = ""+dataSplit[2] +" "+ dataSplit[1] + " " + dataSplit[3] + " " + dataSplit[4]+"" ;
            results[0].date_reg = data;
        return results;
    }

       


}

module.exports = Seller;