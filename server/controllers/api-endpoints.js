const express = require('express');
const router = express.Router();
const endpoints = [
  require('./virustracker/virustracker')
]

endpoints.forEach(api=> {
  router.use('/api', api)
});


module.exports = router;
