import chalk from 'chalk'
import fs from 'fs'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

const logger = (req, res, next) => {

    const logData = `${new Date().toLocaleString()} - ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} - ${res.statusCode}, ${res.statusMessage || 'No Status Message'}`
    let coloredLogData = logData;

    if (res.statusCode >= 200 && res.statusCode < 300) {
        // Green for successful responses
        coloredLogData = chalk.green(logData);
    } else if (res.statusCode >= 400 && res.statusCode < 500) {
        // Yellow for client errors
        coloredLogData = chalk.yellow(logData);
    } else if (res.statusCode >= 500) {
        // Red for server errors
        coloredLogData = chalk.red(logData);
    }

    console.log(coloredLogData)

    fs.appendFile(`${logsDir}/server.log`, `${logData} \n`, (err) => {
        if (err) {
            console.error('Error writing to log file:', err)
        }
    });


    next()
}

export default logger;