const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const allowedRoles = require('../middleware/allowedRoles');
const roles = require('../config/roles');

router.route('/')
    .get(allowedRoles(roles.admin), userController.getAllUsers)
    .delete(allowedRoles(roles.admin), userController.deleteUser);

router.route('/:id')
    .get(allowedRoles(roles.admin),userController.getUser);

module.exports = router;
