var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: process.env.DB_PORT,
    options: {
        database: process.env.DB_NAME,
        encrypt: true
    },
}

var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    }
});

module.exports = {
    reportCall: function(duration) {
        return new Promise ( (resolve, reject) => {
            request = new Request('' +
                'INSERT INTO ib_call_table ' +
                '(duration) ' +
                'OUTPUT INSERTED.call_id ' +
                'VALUES (' + duration + ')', function (err) {

                if (err) {
                    console.log(err);
                    return reject(err);
                } else {
                    console.log('Calculated');
                }
            });

        request.on('row', function(columns) {
            return resolve(columns[0].value);
        });

        connection.execSql(request);
    });
    }
};