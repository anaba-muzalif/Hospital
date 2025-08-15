const roles = require('../config/roles');

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.roles) return res.sendStatus(404);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles)
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.status(401).json({"message" : `you need to be atleast ${rolesArray} to access this`});
        next();
    }
}

module.exports = verifyRoles;