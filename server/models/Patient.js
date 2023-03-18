import mongoose from "mongoose";

const patientsSchema = new mongoose.Schema({
  name: String,
  contact: String,
  aadhaar: String,
  imgURL: String
});

const Patient = mongoose.model("Patient", patientsSchema);

export default Patient;
