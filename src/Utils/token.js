const { randomBytes } = require('crypto');

const generateToken = () => randomBytes(8).toString('hex');

module.exports = generateToken;