import React from "react";
import { useNavigate } from "react-router-dom";
import FaceRecognition from "./WebCamPage.js";

export default function AdminPage() {
  let aadhaar = "";
  let userImgUrl = "";
  const navigate = useNavigate();
  const handInp = (e) => {
    const value = e.target.value;
    aadhaar = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/admin/${aadhaar}`, {
        method: "GET",
      });
      // console.log("after");
      const json = await response.json();
      userImgUrl = json.imgURL;
      console.log(json);
      navigate("/webcam", {state: {url: userImgUrl, aadhaar: aadhaar}})
    } catch (err) {
      alert("Aadhar does not exist");
      console.log({ error: err.message });
    }
  };

  return (
    <>
      <form className="">
        <div className="form-group m-4 ">
          <label htmlFor="exampleInputEmail1">Aadhar</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="aadhaar"
            aria-describedby="emailHelp"
            placeholder="Enter aadhaar"
            onChange={handInp}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary bg-dark"
          onClick={handleSubmit}>
          Submit
        </button>
      </form>

      
    </>
  );
}
