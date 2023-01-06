// This js file will create a template for the fs writing, deleting, and reading functionality for the notes.//
// Import required libraries//
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
/**
 * 
 * @param {string} destination 
 * @param {object} content 
 * @returns {void}
 */
// Template to be used to write to the db.json file when post is called//
const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content,null,4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    )};

/**
 * 
 * @param {object} content 
 * @param {string} file 
 * @returns {void}
 */

// Function to read the file and parse data then append content provided by front end
// and re-write the file over the other file.//
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });

};
// function to read current file//
const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // parse current data.//
            const parsedData = JSON.parse(data);
            // find the index of note_id provided by user delete input.//
            const index = parsedData.findIndex(x => x.note_id === id);
            // remove that index number from the DB array.//
            parsedData.splice(index, 1);
            // re-write file without deleted id//
            writeToFile(file, parsedData);
        }
    });
}

// export these functions//
module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete};