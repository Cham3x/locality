class Users {
    constructor( id, name, lastname, password, email, adresse, city, lat, lon, code, tel, birth_date, role) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.adresse = adresse;
        this.city = city;
        this.lat = lat;
        this.lon = lon;
        this.code = code;
        this.tel = tel;
        this.birth_date = birth_date;
        this.role = role;
    }

    register() {
        throw new Error("Error Abstract Method");
    }

    getUserInfo() {
        throw new Error("Error Abstract Method");
    }

}

module.exports = Users;