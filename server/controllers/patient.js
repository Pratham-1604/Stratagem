import Patient from "../models/Patient.js";

/* READ */
export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Patient.findOne({aadhaar: id});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};