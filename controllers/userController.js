const User = require('../model/usersDB');

const getAllUsers = async (req, res) => {
    const users = await User.find();

    if (!users) {
        return res.status(404).json({ "message" : "No users found"});
    }

    res.json({ users });
}

const deleteUser = async(req, res) => {
    if (!req.body.id) {
        return res.status(422).json({ "message" : "user ID is required to delete records"});
    }

    const user = await User.findOne({ _id : req.body.id }).exec();
    if (!user) {
        return res.status(404).json({ "message" : `no user matched ID ${req.body.id}` });
    }

    const result = await User.deleteOne({ _id : req.body.id});

    res.status(204).json({ "message" : "user successfully deleted."});
}

const getUser = async (req, res) => {
    if (!req.params.id) {
        return res.status(422).json({ "message" : "ID parameter is required"});
    }

    const user = await User.findOne({ _id : req.params.id }).exec();
    if (!user) {
        return res.status(404).json({"message" : `no user matched ID ${req.params.id}`});
    }

    res.json({ user });
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}