const allowedDomains = require('./allowedDomains');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedDomains.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('CORS error'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions