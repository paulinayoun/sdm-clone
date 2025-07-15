// config.js
require('dotenv').config();

module.exports = {
    shinobi: {
        url: process.env.SHINOBI_URL,
        apiKey: process.env.SHINOBI_API_KEY,
        groupKey: process.env.SHINOBI_GROUP_KEY
    }
};