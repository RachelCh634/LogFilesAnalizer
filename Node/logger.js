
const fs = require('fs');
const readline = require('readline');
let logObjects = []


exports.parseLogFile = async (filePath) => {
    
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    logObjects = []
    for await (const line of rl) {
        const parts = line.match(/\[(.*?)\]/g).map(part => part.slice(1, -1));
        const logObject = {
            timestamp: parts[0],
            loggerName: parts[1],
            logType: parts[2],
            message: line.substring(line.lastIndexOf(']') + 2)
        };
        logObjects.push(logObject);
    }
    return logObjects;
}


exports.GetLogger = async (req, res) => {
    try {
        res.send(logObjects); 
    }
    catch (error) {
        console.error("Error parsing log file ", error)
    }
};

