import Patient from "../models/Patient.js";

/* REGISTER USER */
export const registerPatient = async (req, res) => {
  try {
    const { name, contact, aadhaar, imgURL } = req.body;

    const newPatient = new Patient({
      name,
      contact,
      aadhaar,
      imgURL
    });
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

// app.post("/patientSignup", async (req, res)=> {
//   bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
//     const newPatient = new Patient({
//       patientName: req.body.name,
//       patientCity: req.body.city,
//       patientBloodGroup: req.body.group,
//       patientContact: req.body.contact,
//       password: hash,
//     });
//     await newPatient.save();
//     console.log("Registered");
//     res.json(newPatient);
//   });
// });

/* LOGGING IN */
// export const patientLogin = async (req, res) => {
//   try {
//     const { patientName, password } = req.body;
//     const patient = await Patient.findOne({ name: patientName });
//     if (!patient)
//       return res.status(400).json({ msg: "Patient does not exist. " });

//     // console.log(req.body);
//     const isMatch = await bcrypt.compare(password, patient.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

//     const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET);
//     delete patient.password;
//     res.status(200).json({ token, patient });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
