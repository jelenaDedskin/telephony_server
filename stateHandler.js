const stoped = 'STOPED';
const paused = 'PAUSED';
const started = 'STARTED';
var state = stoped;
module.exports = {
    stoped : stoped,
    paused : paused,
    started : started,
    setState: function(value) {
        state = value;
    },

    getState: function() {
        return state;
    },

    shouldSendEvent() {
        return state === started;
    }
};