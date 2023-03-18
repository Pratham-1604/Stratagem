import React from "react";

import * as faceapi from "face-api.js";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FaceRecognition = () => {
  const location = useLocation();
  const videoRef = useRef();
  const canvasRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState(null);

  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if(count === -1){
      navigate('/unsuccess')
    } else if(count === 5){
      navigate('/success', {state: {aadhaar: location.state.aadhaar}})
    }
  }, [count])

  useEffect(() => {
    const moduleLoader = async () => {
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    };

    moduleLoader()
      .then(() => setIsLoaded(true))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const getUserMedia = async () => {
      const image = await faceapi.fetchImage(location.state.url);

      const results = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors();
      const faceMatch = new faceapi.FaceMatcher(results, 0.6);
      setFaceMatcher(faceMatch);
      videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
    };

    getUserMedia()
      .then(() => setIsVideoLoaded(true))
      .catch((err) => console.log("Video error: " + err.message));
  }, [isLoaded]);

  useEffect(() => {
    if (!isVideoLoaded) return;

    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };

    const unsubscribeIntervals = [
      setInterval(async () => {
        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detections = await faceapi
          .detectAllFaces(videoRef.current)
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      }, 10),

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoRef.current)
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        const results = resizedDetections.map((d) =>
          faceMatcher.findBestMatch(d.descriptor)
        );

        console.log(results[0]._label)

        if (results[0]._label === 'unknown') {
          setCount(-1);
        }

        else {
          setCount((prevCount) => prevCount + 1);
        }
      }, 5000),
    ];

    return () => unsubscribeIntervals.forEach((e) => clearInterval(e));
  }, [isVideoLoaded, faceMatcher]);

  if (!isLoaded) {
    return <h1>Loading..</h1>;
  }

  return (
    <>
      <div className="face-container" style={{ position: "relative" }}>
        <video
          ref={videoRef}
          id="webcam"
          autoPlay
          muted
          width={"600px"}
          height={"432px"}></video>
        <canvas
          ref={canvasRef}
          id="face-canvas"
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
          }}></canvas>
      </div>
    </>
  );
};

export default FaceRecognition;