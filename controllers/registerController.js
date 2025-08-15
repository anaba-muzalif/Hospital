const User = require('../model/usersDB');
const bcrypt = require('bcrypt');

const registerNewUser = async (req, res) => {
    const { firstname, lastname, password} = req.body;

    if (!firstname) return res.status(422).json({ "message" : "firstname is required"});
    if (!lastname) return res.status(422).json({ "message" : "lastname is required"});
    if (!password) return res.status(422).json({ "message" : "password is required"});

    const duplicate = await User.findOne({ firstname, lastname}).exec();
    if (duplicate) return res.status(409).json({ "message" : `user ${firstname} ${lastname} already exists`});

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            "firstname": firstname,
            "lastname": lastname,
            "password": hashedPassword 
        });
        res.status(201).json({ "success" : `new user ${firstname} ${lastname} created.`});
    } catch (err) {
        res.status(500).json({"message" : err.message});
    }
}

module.exports = registerNewUser;