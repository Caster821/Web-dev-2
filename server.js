const WebSocket = require('ws');
const logger = require('./logger');

const wss = new WebSocket.Server({ port: 8088 });
logger.info('WebSocket server started on port 8088');

wss.on('connection', (ws) => {
  const clientId = Date.now();
  logger.info(`Client connected: ${clientId}`);

  ws.send('Welcome to the WebSocket Chat!');

  ws.on('message', (message) => {
    logger.info(`Message from ${clientId}: ${message}`);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Client ${clientId}: ${message}`);
      }
    });
  });

  ws.on('close', () => {
    logger.info(`Client disconnected: ${clientId}`);
  });
});
