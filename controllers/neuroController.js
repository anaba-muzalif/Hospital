const NeuroPatient = require('../model/neuroDB');

const getAllPatients = async (req, res) => {
    const patients = await NeuroPatient.find();

    if (!patients) {
        return res.status(404).json({"message" : "No patients in the ward"});
    }

    res.json({ patients });
}

const addNewPatient = async (req, res) => {
    if (!req.body.firstname) {
        return res.status(422).json({ "message" : "firstname is required"});
    }
    if (!req.body.lastname) {
        return res.status(422).json({ "message" : "lastname is required"});
    }
    if (!req.body.birthDate) {
        return res.status(422).json({ "message" : "birthDate is required"});
    }
    if (!req.body.bedNumber) {
        return res.status(422).json({ "message" : "bedNumber is required"});
    }
    if (!req.body.diagnosis) {
        return res.status(422).json({ "message" : "diagnosis is required"});
    }

    const newPatient = await NeuroPatient.create({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "birthDate": req.body.birthDate,
        "bedNumber": req.body.bedNumber,
        "diagnosis": req.body.diagnosis
    });

    res.status(201).json({ "success" : `new patient ${req.body.firstname} ${req.body.lastname} with birthDate ${req.body.birthDate} added to bed number ${req.body.bedNumber} with a diagnosis of ${req.body.diagnosis}`});
}

const updatePatient = async (req, res) => {
    if (!req.body.id) {
        res.status(422).json({ "message" : "patient ID is needed to make changes to records"});
    }

    const patient = await NeuroPatient.findOne({ _id: req.body.id}).exec();
    if (!patient) {
        return res.status(404).json({ "message" : `no patient matched ID ${req.body.id}`});
    } 

    if (req.body?.firstname) patient.firstname = req.body.firstname;
    if (req.body?.lastname) patient.lastname = req.body.lastname;
    if (req.body?.birthDate) patient.birthDate = req.body.birthDate;
    if (req.body?.bedNumber) patient.bedNumber = req.body.bedNumber;
    if (req.body?.diagnosis) patient.diagnosis = req.body.diagnosis;
    if (req.body.dischargeDate) patient.dischargeDate = req.body.dischargeDate;

    const result = await patient.save();
    res.status(200).json({"message" : `you have successfully updated ${patient.firstname} ${patient.lastname}'s records.`});
}

const deletePatient = async (req, res) => {
    if (!req.body.id) {
        return res.status(422).json({ "message" : "patient ID is required to delete records"});
    }

    const patient = await NeuroPatient.findOne({ _id: req.body.id}).exec();
    if (!patient) {
        return res.status(404).json({ "message" : `no patient matched the ID ${req.body.id}`});
    }

    const result = await NeuroPatient.deleteOne({ _id : req.body.id});
    res.status(204).json({ "message" : "patient records successfully deleted"});
}

const getPatient = async (req, res) => {
    if (!req.params.id) {
        return res.status(422).json({ "message" : "ID parameter is required" });
    }

    const patient = await NeuroPatient.findOne({ _id : req.params.id });
    if (!patient) {
        res.status(404).json({"message" : `no patient matched ID ${req.params.id}`});
    }

    res.json({ patient });
}

module.exports = {
    getAllPatients,
    addNewPatient,
    updatePatient,
    deletePatient,
    getPatient
}