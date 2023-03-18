import express from "express";
import { getPatient } from "../controllers/patient.js";

const router = express.Router();

/* READ */
router.get("/:id", getPatient);

export default router;