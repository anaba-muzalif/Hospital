const allowedDomains = require('../config/allowedDomains');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedDomains.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;