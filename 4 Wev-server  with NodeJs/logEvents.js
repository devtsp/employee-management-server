// Date functions: formatting
const { format } = require('date-fns');

// ID generator
// Importing Version 4 { v4 } of 'uuid' AS 'uuid' (instead of { xxx as xx } : { vX: xxx })
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, fileName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem =`${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, 'logs', fileName), logItem);
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
