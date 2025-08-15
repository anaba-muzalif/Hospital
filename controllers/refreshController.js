const User = require('../model/usersDB');
const jwt = require('jsonwebtoken');

const handleRefresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(404).json({"message" : "no cookies found"});
    const refreshToken = cookies.jwt;
    
    const user = await User.findOne({ refreshToken }).exec();
    if (!user) return res.status(404);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            if (user.firstname !== decoded.firstname) return res.sendStatus(403);
            if (user.lastname !== decoded.lastname) return res.sendStatus(403);

            const roles = Object.values(user.roles);

            const accessToken = jwt.sign(
                {
                    "firstname": decoded.firstname,
                    "lastname": decoded.lastname,
                    "roles": roles
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '6h'}
            );
            res.json({ accessToken });
        }
    );
}

module.exports = handleRefresh;