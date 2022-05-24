const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, fileName) => {
	const dateTime = `${format(new Date(), 'dd/MM/yyyy-HH:mm:ss')}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
	try {
		if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
			await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
		}
		await fsPromises.appendFile(
			path.join(__dirname, '..', 'logs', fileName),
			logItem
		);
	} catch (err) {
		console.log(err);
	}
};

const logger = (req, res, next) => {
	console.log(`${req.method}\t${req.url}`);
	logEvents(`${req.headers.referer}\t${req.method}\t${req.url}`, 'reqLog.txt');
	next();
};

module.exports = { logger, logEvents };
