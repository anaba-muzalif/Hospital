const User = require('../model/usersDB');


const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
        res.sendStatus(204);
    }

    user.refreshToken = '';
    const result = await user.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
    res.status(204).json({"message" : `user ${user.firstname} ${user.lastname} successfully logged out.`});
}

module.exports = handleLogout;