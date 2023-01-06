// This module will generate a random note id using a function//
module.exports = () =>
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);