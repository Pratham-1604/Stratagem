import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

import "./Login.css";

export default function Register() {
  const [userReg, setUserReg] = useState({
    name: "",
    contact: "",
    aadhaar: "",
  });

  let imageURL = "";
  const [imageUpload, setImageUpload] = useState(null);
  const [records, setRecords] = useState([]);

  const handInp = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log([name]);
    // console.log([value]);
    setUserReg({ ...userReg, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = { ...userReg, id: new Date().getTime().toString() };
    // console.log(records);
    setRecords([...records, newRecord]);
    // console.log(records);

    if (imageUpload == null) return;
    if (userReg.aadhaar !== "") {
      const imageRef = ref(storage, `images/${userReg.aadhaar}.jpg`);
      uploadBytes(imageRef, imageUpload).then(async () => {
        alert("Image Uploaded!");
        await getDownloadURL(imageRef).then(async (url) => {
          imageURL = url;
          // console.log(url);
          // console.log("before");
          try {
            const response = await fetch(
              "http://localhost:5000/auth/register",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: userReg.name,
                  aadhaar: userReg.aadhaar,
                  contact: userReg.contact,
                  imgURL: imageURL,
                }),
              }
            );
            // console.log("after");
            const json = await response.json();
            console.log(json);
          } catch (err) {
            console.log({ error: err.message });
          }
        });
      });
    } else {
      alert("add aadhar details");
    }
    alert("Your details are entered in the system");
  };

  return (
    <body className="">
      <form className="">
        <div className="form-group m-4 ">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={handInp}
          />
        </div>
        <div className="form-group m-4">
          <label htmlFor="exampleInputEmail1">Contact</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="contact"
            aria-describedby="emailHelp"
            onChange={handInp}
            placeholder="Enter contact details"
          />
        </div>
        <div className="form-group m-4">
          <label htmlFor="exampleInputEmail1">Aadhaar</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            name="aadhaar"
            aria-describedby="emailHelp"
            onChange={handInp}
            placeholder="Enter Aadhaar"
          />
        </div>
        <div className="form-group m-4">
          <input
            type="file"
            name="imgURL"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary bg-dark"
          onClick={handleSubmit}>
          Submit
        </button>
      </form>

      <div>
        {records.map((curEle) => {
          return (
            <div className="showDataStyle">
              <p>{curEle.username}</p>
              <p>{curEle.email}</p>
              <p>{curEle.number}</p>
              <p>{curEle.password}</p>
            </div>
          );
        })}
      </div>
      <div className="m-4">
        <a href="/admin" target="_blank" rel="noopener noreferrer">
          <button>Go to admin</button>
        </a>
      </div>
    </body>
  );
}
