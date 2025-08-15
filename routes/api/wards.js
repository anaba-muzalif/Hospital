const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middleware/allowedRoles');
const roles = require('../../config/roles');
const maternityController = require('../../controllers/maternityController');
const maleController = require('../../controllers/maleController');
const neuroController = require('../../controllers/neuroController');

router.route('/maternity')
    .get(maternityController.getAllPatients)
    .post(verifyRoles(roles.incharge, roles.doctor, roles.staff), maternityController.addNewPatient)
    .put(verifyRoles(roles.incharge, roles.doctor, roles.staff), maternityController.updatePatient)
    .delete(verifyRoles(roles.doctor, roles.incharge), maternityController.deletePatient);

router.get('/maternity/:id', maternityController.getPatient);

router.route('/male')
    .get(maleController.getAllPatients)
    .post(verifyRoles(roles.incharge, roles.doctor, roles.staff), maleController.addNewPatient)
    .put(verifyRoles(roles.incharge, roles.doctor, roles.staff), maleController.updatePatient)
    .delete(verifyRoles(roles.doctor, roles.incharge), maleController.deletePatient);

router.get('/male/:id', maleController.getPatient);


router.route('/neuro')
    .get(neuroController.getAllPatients)
    .post(verifyRoles(roles.doctor, roles.incharge, roles.staff), neuroController.addNewPatient)
    .put(verifyRoles(roles.doctor, roles.incharge, roles.staff), neuroController.updatePatient)
    .delete(verifyRoles(roles.doctor, roles.incharge), neuroController.deletePatient);

router.route('/neuro/:id')
    .get(neuroController.getPatient);

module.exports = router;