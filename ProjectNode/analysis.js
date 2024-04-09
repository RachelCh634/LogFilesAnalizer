function divideObjectsByErrorType(objectsArray) {
    // יצירת אובייקט שיכיל את המערכים לפי סוגי השגיאות
    let dividedObjects = {};

    // לעבור על כל אובייקט במערך
    objectsArray.forEach(obj => {
        // בדיקת סוג השגיאה
        let errorType = obj.logType;
        // אם הסוג של השגיאה עדיין לא קיים כמפתח באובייקט המחולק, ניצור מערך חדש עבורו
        if (!dividedObjects[errorType]) {
            dividedObjects[errorType] = [];
        }
        // הוספת האובייקט למערך המתאים לסוג השגיאה
        dividedObjects[errorType].push(obj);
    });

    // החזרת האובייקט המחולק לפי סוגי השגיאות
    return dividedObjects;
}

function countErrorsByType(dividedObjects) {
    // יצירת אובייקט שיכיל את הספירה לפי סוגי השגיאות בכל מיקום
    let errorCounts = {};

    // לעבור על כל מיקום באובייקט המחולק לפי סוגי השגיאות
    for (let errorType in dividedObjects) {
        // לחשב את מספר השגיאות במיקום הנוכחי ולהוסיף אותו לאובייקט הסופי
        errorCounts[errorType] = dividedObjects[errorType].length;
    }

    // החזרת האובייקט עם הספירה לפי סוגי השגיאות בכל מיקום
    return errorCounts;
}
