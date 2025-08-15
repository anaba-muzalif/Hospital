const MalePatient = require('../model/maleDB');

const getAllPatients = async (req, res) => {
    const patients = await MalePatient.find();
    if (!patients) return res.status(404).json({ "message" : "no patients in the ward"});
    res.json({ patients });
}

const addNewPatient = async (req, res) => {
    if (!req.body.firstname) { 
        return res.status(422).json({"message" : "patient's firstname is required!"});
    }
    if (!req.body.lastname) {
        return res.status(422).json({"message" : "patient's lastname is required!"});
    }
    if (!req.body.birthDate) {
        return res.status(422).json({"message" : "patient's birthDate is required!"})
    }
    if (!req.body.bedNumber) {
        return res.status(422).json({"message" : "patient's bed number is required!"});
    }
   
    const newPatient = await MalePatient.create({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "birthDate": req.body.birthDate,
        "bedNumber": req.body.bedNumber,
        "diagnosis": req.body.diagnosis
    });

    res.status(201).json({"message" : `new patient ${req.body.firstname} ${req.body.lastname} with birthDate ${req.body.birthDate} and a diagnosis of ${req.body.diagnosis} added to bed Number ${req.body.bedNumber}`});
}

const updatePatient = async (req, res) => {
    if (!req.body.id) {
        return res.status(422).json({"message" : "patient's ID is required"});
    }    
    let foundPatient = await MalePatient.findOne({ _id: req.body.id}).exec();

    if(!foundPatient) {
        return res.status(404).json({"message": `no patient matched the ID ${req.body.id}`});
    }


    if (req.body?.firstname) foundPatient.firstname = req.body.firstname;
    if (req.body?.lastname) foundPatient.lastname = req.body.lastname;
    if (req.body?.birthDate) foundPatient.birthDate = req.body.birthDate;
    if (req.body?.bedNumber) foundPatient.bedNumber = req.body.bedNumber;
    if (req.body?.diagnosis) foundPatient.diagnosis = req.body.diagnosis;
    if (req.body?.dischargeDate) foundPatient.dischargeDate = req.body.dischargeDate;

    const result = await foundPatient.save();
    res.status(200).json({"success" : `you have successfully updated ${foundPatient.firstname} ${foundPatient.lastname}'s records`});
}

const deletePatient = async (req, res) => {
    if (!req.body.id) {
        return res.status(422).json({ "message" : "patient's ID is required to delete records"});
    }

    const foundPatient = await MalePatient.findOne({ _id: req.body.id}).exec();
    if (!foundPatient) {
        return res.status(404).json({ "message" : `ID ${req.body.id} does not match any patient in the ward`});
    }

    const result = await MalePatient.deleteOne({ _id: req.body.id });
    res.status(204).json({ "success" : "Patient records have been deleted"});
}

const getPatient = async (req, res) => {
    if (!req.params.id) {
        return res.status(422).json({"message" : "ID parameter is required"});
    }

    const foundPatient = await MalePatient.findOne({ _id : req.params.id}).exec();
    if (!foundPatient) {
        return res.status(404).json({"message" : `no patient matched the ID ${req.params.id}.`});
    }

    res.json({ foundPatient });
}

module.exports = {
    getAllPatients,
    addNewPatient,
    updatePatient,
    deletePatient,
    getPatient
}