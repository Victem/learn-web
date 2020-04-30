const express = require('express');
const router = express.Router();
const endpoints = [
  require('./virustracker/virustracker'),
  require('./database/database')
];

endpoints.forEach(api=> {
  router.use('/api', api)
});


module.exports = router;
