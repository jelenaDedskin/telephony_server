const express = require('express');
const serverController = require('../../controllers/serverController');

const router = express.Router();

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
router.post('/start', (req, res) => {
  serverController.startServer(req, res);
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
router.post('/stop', (req, res) => {
  serverController.stopServer(req, res);
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
router.post('/pause', (req, res) => {
  serverController.pauseServer(req, res);
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
router.post('/resume', (req, res) => {
  serverController.resumeServer(req, res);
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
router.post('/call/report', (req, res) => {
  serverController.reportCall(req, res);
});

// the catch all route
router.all('*', (req, res) => {
  res.status(404).send({
    data: '',
    error: 'Not found',
  });
});

module.exports = router;
