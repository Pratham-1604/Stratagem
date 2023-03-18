import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Register from "./Components/form/RegisterPage";
import AdminPage from "./Components/AdminPage";
import { FaceDetection } from "face-api.js";
import FaceRecognition from "./Components/WebCamPage";

function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/webcam" element={<FaceRecognition />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/unsuccess" element={<Unsuccess />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
