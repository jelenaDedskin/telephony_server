require('dotenv').config()
const request = require('request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var stateHandler = require('./stateHandler.js');
var responseHandler = require('./responseHandler.js');
var db = require('./db.js');
var processUrl;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/**
 * @api {post} /start/ Initialize server
 * @apiName Telephony Server
 * @apiGroup Telephony Server
 *
 * @apiParam {String} processUrl.
 *
 * @apiSuccess {String} data Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "Server initialized"
 *     }
 *
 * @apiError Error There was an error.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "There was an error"
 *     }
 */
app.post('/start', function (req, res) {
    startServer(req, res);
});

/**
 * @api {post} /stop/ Stop server
 * @apiName Telephony Server
 * @apiGroup Telephony Server
 *
 * @apiSuccess {String} data Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "Server stoped"
 *     }
 *
 * @apiError Error There was an error.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "There was an error"
 *     }
 */
app.post('/stop', function (req, res) {
    stopServer();
});

/**
 * @api {post} /pause/ Pause server
 * @apiName Telephony Server
 * @apiGroup Telephony Server
 *
 * @apiSuccess {String} data Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "Server paused"
 *     }
 *
 * @apiError Error There was an error.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "There was an error"
 *     }
 */
app.post('/pause', function (req, res) {
    pauseServer();
});

/**
 * @api {post} /resume/ Resume server
 * @apiName Telephony Server
 * @apiGroup Telephony Server
 *
 * @apiSuccess {String} data Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "Server resumed"
 *     }
 *
 * @apiError Error There was an error.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "There was an error"
 *     }
 */
app.post('/resume', function (req, res) {
    resumeServer();
});

/**
 * @api {post} /call/report Will create and report new call to Processing server
 * @apiName Telephony Server
 * @apiGroup Telephony Server
 *
 * @apiSuccess {String} data Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "Call was successfully updated"
 *     }
 *
 * @apiError Error There was an error.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "Call could not be reported"
 *     }
 */
app.post('/call/report', function (req, res) {
    if(typeof processUrl !== 'undefined' && stateHandler.shouldSendEvent()) {
        var duration = req.body.duration;

        db.reportCall(duration).then(function(callId){
            sendRequest(callId);
        });
    } else {
        responseHandler.errorResponse(res, 'Call could not be reported');
    }

});

app.listen(process.env.PORT, function () {
    console.log('Listening on port 3000!');
});

function startServer(req, res) {
    processUrl = req.body.processUrl;
    stateHandler.setState(stateHandler.started);
    responseHandler.successResponse(res, 'Server initialized');
}

function stopServer() {
    processUrl = null;
    stateHandler.setState(stateHandler.stoped);
    responseHandler.successResponse(res, 'Server stoped');
}

function pauseServer() {
    stateHandler.setState(stateHandler.paused);
    responseHandler.successResponse(res, 'Server paused');
}

function resumeServer() {
    stateHandler.setState(stateHandler.started);
    responseHandler.successResponse(res, 'Server resumed');
}

function sendRequest(callId) {
    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     processUrl,
        form:    { callId: callId }
    }, function(error, response, body){
        console.log(body);
    });
}