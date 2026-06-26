const https = require('https');

const agent = new https.Agent({ keepAlive: true, maxSockets: 25 });
agent.setMaxListeners(25);

module.exports = {
  '/api': {
    target: 'https://api.the7kingdoms.org',
    changeOrigin: true,
    secure: true,
    agent,
    logLevel: 'warn',
  },
};
