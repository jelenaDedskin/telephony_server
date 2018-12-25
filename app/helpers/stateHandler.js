const stopped = 'STOPPED';
const paused = 'PAUSED';
const started = 'STARTED';
let state = stopped;

const isValidStateSwitch = (value) => {
  switch (value) {
    case started:
      return state !== started;
    case stopped:
      return state !== stopped;
    case paused:
      return state === started;
    default:
      return false;
  }
};

module.exports = {
  stopped,
  paused,
  started,
  setState: (value) => {
    if (isValidStateSwitch(value)) {
      state = value;
      return true;
    }
    return false;
  },

  getState: () => state,

  shouldSendEvent() {
    return state === started;
  },

  shouldReportCall() {
    return state !== stopped;
  },
};
