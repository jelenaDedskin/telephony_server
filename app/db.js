const { Connection } = require('tedious');
const { Request } = require('tedious');

const config = {
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: process.env.DB_PORT,
  options: {
    database: process.env.DB_NAME,
    encrypt: true,
  },
};

const connection = new Connection(config);

module.exports = {
  reportCall: async (duration) => {
    const sqlString = `INSERT INTO ib_call_table (duration) OUTPUT INSERTED.call_id VALUES (${duration})`;
    return new Promise((resolve, reject) => {
      const request = new Request(sqlString, (err) => {
        if (err) {
          reject(err);
        }
      });

      request.on('row', columns => resolve(columns[0].value));

      connection.execSql(request);
    });
  },
};
