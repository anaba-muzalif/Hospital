const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/usersDB');

const handleLogin = async (req, res) => {
    const { firstname, lastname, password } = req.body;

    if (!firstname) return res.status(422).json({ "message" : "firstname is required"});
    if (!lastname) return res.status(422).json({ "message" : "lastname is required"});
    if (!password) return res.status(422).json({ "message" : "password is required"});

    const user = await User.findOne({ firstname, lastname}).exec();
    if (!user) return res.status(404).json({"message": `user ${firstname} ${lastname} does not exist`});

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) return res.status(401).json({"message" : "password does not match with the existing user"});

    try {
        const roles = Object.values(user.roles);
        const accessToken = jwt.sign(
            {
                "firstname": user.firstname,
                "lastname": user.lastname,
                "roles": roles
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '6h'}
        );

        const refreshToken = jwt.sign(
            { "firstname" : user.firstname, "lastname": user.lastname},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d'}
        );

        user.refreshToken = refreshToken;
        const result = await user.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.json({ "accessToken": accessToken });

    } catch (err) {
        res.status(500).json({"message" : `could not log in user ${firstname} ${lastname}`});
    }
}

module.exports = handleLogin;