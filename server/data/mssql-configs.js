const mssql = require('mssql');

// Data Source=HOME-01\\SQLEXPRESS;Initial Catalog=MetrologySQL;Integrated Security=True;Connect Timeout=15;
/* const connectionString = `Driver=msnodesqlv8;Server=HOME-01\SQLEXPRESS;Database=database;UID=sa;PWD=123456;Encrypt=true`;
const config = {
  user: 'sa',
  password: '123456',
  server: `Home-01/sqlexpress`,
  database: 'MetrologySql',
  options: {
    enableArithAbort : true
  }

}; */
//const pool = mssql.connect(config);

const config = {
  server: 'HOME-01',
  authentication: {
    type: 'default',
     options: {
      userName: 'sa',
      password: '123456'
    },
  },
  options: {
    database: 'MetrologySQL',
    instanceName: 'SQLEXPRESS'
  }
}

module.exports = config;
