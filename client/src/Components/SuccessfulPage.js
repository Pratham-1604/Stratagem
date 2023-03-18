import React from "react";
import { useLocation } from "react-router-dom";

const SuccessfulPage = async () => {
  const location = useLocation();
  const { aadhaar } = location.state.aadhaar;
  let user;
  try {
    const response = await fetch(`http://localhost:5000/admin/${aadhaar}`, {
      method: "GET",
    });
    // console.log("after");
    const json = await response.json();
    user = json;
  } catch (err) {
    console.log({ error: err.message });
  }

  return <div>
    <h3>name: {user.name}</h3>
    <h3>contact: {user.contact}</h3>
    <h3>You're admitted!</h3>
  </div>;
};

export default SuccessfulPage;
