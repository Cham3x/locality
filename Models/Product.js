const db = require("../Bdd/db");

class Product{
    constructor(id,name,desc,cat,price,stock,click,delivery,sellerId){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.cat = cat;
        this.price = price;
        this.stock = stock;
        this.click = click;
        this.delivery = delivery;
        this.sellerId = sellerId;
    }
    
    static async updateProduct(productId, updatedFields) {
        try {
            // Construire la requête SQL dynamique
            const fields = Object.keys(updatedFields)
              .map(field => `${field} = ?`)
              .join(', ');
      
            const values = Object.values(updatedFields);
            values.push(productId); // Ajouter l'ID à la fin pour la clause WHERE
      
            const query = `UPDATE products SET ${fields} WHERE id = ?`;
            const [result] = await db.execute(query, values);
            return result;
          } catch (error) {
            return error;
          }
    }
    
    static async deleteProduct(productId){
        const query = "DELETE FROM products WHERE id = ?";
        const [results] = await db.query(query,[productId]);
        console.log('from Product classe'+results)
        return results;
    }


    async regProduct(){
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
        const query="INSERT INTO products (name, description, cat, price, stock, click_collect, delivery, date_creation, id_sellers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const [results] = await db.query(query,[this.name, this.desc, this.cat, this.price, this.stock, this.click, this.delivery,formattedDate, this.sellerId ]);           
       console.log(JSON.stringify(results));
        return results;
            
    }  
     
    static async getProductInfoByProductId(productId){
        const query = "SELECT id,name, description, cat, price, stock, click_collect, delivery, date_creation, id_sellers FROM products WHERE id = ?";
        const [results] = await db.query(query,[productId]);
               if(results.length > 0)
                    {
                        for(let i = 0; i < results.length; i++){
                            let dataSplit = results[i].date_creation.toString().split(" ");// formattage date
                            const data = ""+dataSplit[2] +" "+ dataSplit[1] + " " + dataSplit[3] + " " + dataSplit[4]+"" ;
                            results[i].date_creation = data;
                        }
                    }
                    console.log(JSON.stringify(results));       
        return results;
    }

    static async getProductInfoBySellerId(sellerId){
        const query = "SELECT id,name, description, cat, price, stock, click_collect, delivery, date_creation FROM products WHERE id_sellers = ?";
        const [results] = await db.query(query,[sellerId]);
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

    static async getBusinessAddress(req){
        const query = "SELECT id,address FROM sellers WHERE id_user = ?";
        const [results] = await db.query(query,[req.session.userId ]) 
        return results;
 
    }



}

module.exports = Product;