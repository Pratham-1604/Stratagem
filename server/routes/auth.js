import express from "express";
// import { patientLogin, patientSignup } from "../controllers/patientAuth.js";
// import { doctorLogin, doctorSignup } from "../controllers/doctorAuth.js";

import { registerPatient } from "../controllers/patientAuth.js";

const router = express.Router();

// router.post("/patientlogin", patientLogin);
// router.post("/patientsignup", patientSignup);

// router.post("/doctorlogin", doctorLogin);
// router.post("/doctorsignup", doctorSignup);

router.post("/register", registerPatient);
// router.post("/login", loginPatient);

export default router;
