let processUrl;

module.exports = {
  setUrl: (value) => {
    processUrl = value;
  },

  getProcessUrl: () => processUrl,
};
