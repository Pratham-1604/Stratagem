import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Register from "./Components/form/RegisterPage";
import AdminPage from "./Components/AdminPage";
import FaceRecognition from "./Components/WebCamPage";
import SuccessfulPage from "./Components/SuccessfulPage";
import UnsuccessfulPage from "./Components/UnsuccessfulPage";

function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/webcam" element={<FaceRecognition />}></Route>
          <Route path="/success" element={<SuccessfulPage />}></Route>
          <Route path="/unsuccess" element={<UnsuccessfulPage  />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
