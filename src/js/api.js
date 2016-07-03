(() => {
  const api = () => {
    console.log('api');
  };


  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = api;
  } else {
    window.api = api;
  }
})();
