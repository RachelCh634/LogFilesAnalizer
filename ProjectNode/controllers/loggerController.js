const fs = require('fs');
const readline = require('readline');

// פונקציה שתקרא את קובץ הלוגים ותיצור אובייקט עבור כל שורה
exports.parseLogFile = async (req, res, filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const logObjects = []; // מערך לאחסון אובייקטים לכל שורה

    for await (const line of rl) {
        // פצל את השורה למערך של חלקים נפרדים בין הודעות הלוג
        const parts = line.match(/\[(.*?)\]/g).map(part => part.slice(1, -1));

        // יצירת אובייקט עבור השורה הנוכחית
        const logObject = {
            timestamp: parts[0],
            loggerName: parts[1],
            logType: parts[2],
            message: line.substring(line.lastIndexOf(']') + 2)
        };

        // הוספת האובייקט למערך
        logObjects.push(logObject);
    }
    return logObjects;
}