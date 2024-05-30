import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      setLoading(false);
    } catch (e) {
      console.log("error: ", e);
      setError("Error loading models. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  const detectFaces = async () => {
    setError(null);
    const image = webcamRef.current.getScreenshot();
    const img = new Image();
    img.src = image;

    img.onload = async () => {
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length > 0) {
        const descriptors = detections[0].descriptor;
        try {
          const res = await axios.post(`https://face-login-signup.onrender.com/api/user/login`, {
            descriptors: Object.values(descriptors),
          });
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        } catch (e) {
          setError(e.response.data);
        }
      } else {
        setError("No face detected. Please try again.");
      }
    };
  };

  return (
    <div className="register">
      <div className="container">
        <div className="form">
          <div className="heading">
            <span className="span">Login</span>
            <div className="text">Please capture your face to login</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              height={300}
              className="webcam"
            />
            <button
              style={{
                width: "100%",
                backgroundColor: "white",
                color: "blue",
                marginTop: "10px",
              }}
              onClick={detectFaces}
              disabled={loading}
            >
              {loading ? "Loading..." : "Capture"}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
          <div>
            Don't have an account?{" "}
            <Link className="link" to={"/register"}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
