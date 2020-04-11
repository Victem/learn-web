const axios = require('axios');

const virusTrackerService = axios.create({
  baseURL: 'https://api.thevirustracker.com'
})

module.exports = virusTrackerService;
