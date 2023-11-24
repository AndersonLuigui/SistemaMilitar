const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'database-1.crmtakfwaskv.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'OFICIAISdatabase',
  database: 'database-1',
});

// Função para obter militares do banco de dados
const obterMilitaresDoBanco = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Militares', (error, results) => {
      if (error) {
        console.error('Erro ao obter militares do banco de dados:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { obterMilitaresDoBanco };
