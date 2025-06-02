const db = require("../Bdd/db");

class Business{
    constructor(id,name,desc,cat,address,city,lat,lon,code,tel,email,click,delivery,kbis){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.cat = cat;
        this.address = address;
        this.city = city;
        this.lat = lat;
        this.lon = lon;
        this.code = code;
        this.tel = tel;
        this.email = email;
        this.click = click;
        this.delivery = delivery;
        this.kbis = kbis;
    }



    async regBusiness(req){
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
        const query ="INSERT INTO sellers (name, description, cat, address, city, latitude, longitude, code_postal, tel, email, click_collect, delivery, date_creation, kbis, status, id_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)";
        const [results] = await db.query(query,[this.name, this.desc, this.cat, this.address, this.city, this.lat, this.lon, this.code, this.tel, this.email, this.click, this.delivery,formattedDate, this.kbis, req.session.userId ]);
         return results;          
        
    }

    static async getAllCategory(){
        const query = "SELECT name FROM category";
        const [results] = await db.query(query);
        return results;
    }

    static async getBusinessInfo(req){
        const query = "SELECT name,cat,email,tel,address,city,date_creation,click_collect,delivery,description,status FROM sellers WHERE id_user = ?";
        const [results] = await db.query(query,[req.session.userId ])
               if(results.length > 0)
                    {
                        for(let i = 0; i < results.length; i++){
                        let dataSplit = results[i].date_creation.toString().split(" ");// formattage date
                        const data = ""+dataSplit[2] +" "+ dataSplit[1] + " " + dataSplit[3] + " " + dataSplit[4]+"" ;
                        results[i].date_creation = data;
                        }
                    }
        return results;
    }

}
module.exports = Business;