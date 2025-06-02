const mysql = require('mysql2/promise');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // Remplacez par votre utilisateur MySQL
    password: '', // Remplacez par votre mot de passe MySQL
    database: 'locality',
    waitForConnections: true,
    connectionLimit: 20,   // Nombre max de connexions simultanées
    queueLimit: 0
  });
  
 

  module.exports = db;