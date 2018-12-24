module.exports = {
    successResponse: function (res, msg) {
        res.send(JSON.stringify({ data: 'Server initialized' }));
    },

    errorResponse: function (res, msg) {
        res.send(JSON.stringify({ error: 'There was an error! ' + msg }));
    }
};