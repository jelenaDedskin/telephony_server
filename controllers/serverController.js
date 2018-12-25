const axios = require('axios');
const stateHandler = require('../app/helpers/stateHandler');
const responseHandler = require('../app/helpers/responseHandler');
const processUrlHandler = require('../app/helpers/processUrlHandler');
const db = require('../app/db');

const notifyProcess = (callId = null) => {
  try {
    return axios.post(processUrlHandler.getProcessUrl(), {
      callId,
    });
  } catch (error) {
    return error;
  }
};
const switchState = (value, msg, res) => {
  if (stateHandler.setState(value)) {
    responseHandler.successResponse(res, msg);
  } else {
    responseHandler.errorResponse(res, 'Error state switch! ');
  }
};
module.exports = {
  startServer: (req, res) => {
    processUrlHandler.setUrl(req.body.processUrl);
    switchState(stateHandler.started, 'Server initialized', res);
  },

  stopServer: (req, res) => {
    processUrlHandler.setUrl(null);
    switchState(stateHandler.stopped, 'Server stopped', res);
  },

  pauseServer: (req, res) => {
    switchState(stateHandler.paused, 'Server paused', res);
  },

  resumeServer: (req, res) => {
    switchState(stateHandler.started, 'Server resumed', res);
  },

  reportCall: async (req, res) => {
    if (typeof processUrlHandler.getProcessUrl() !== 'undefined' && stateHandler.shouldReportCall()) {
      let duration = 0;
      ({ duration } = req.body);

      const callId = await db.reportCall(duration);
      if (stateHandler.shouldSendEvent()) {
        notifyProcess(callId);
      }
    } else {
      responseHandler.errorResponse(res, 'Call could not be reported');
    }
  },
};
