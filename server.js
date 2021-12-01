const express =  require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const PORT = 3000

app.set('port', PORT || 3000);
app.use(cors())
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use('/api/',routes);


const server = app.listen(PORT, function (err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	else {
		process.send = process.send || function () { };
		process.send('ready');
		console.info(`[backend : ${process.pid}] Express server listening on port ${PORT}`);
	}
});

process.on('SIGINT', () => {
	console.info(`[backend : ${process.pid}] Received SIGINT`);
	console.info(`[backend : ${process.pid}] Shutting down server gracefully on port ${PORT}`);

	server.close(() => {
		console.info(`[backend : ${process.pid}] Server closed for incoming connections`);
	});
});

module.exports = app;