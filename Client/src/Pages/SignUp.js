import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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

  const detectFaces = async (e) => {
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
        const inputs = {
            name,
            descriptors: Object.values(descriptors),
          };
        try {
          const res = await axios.post(
            `https://face-login-signup.onrender.com/api/user/register`,
            inputs
          );
          setSuccess("Registration Successful");
          navigate("/login");
        } catch (e) {
          setError(e.response.data || "Try again");

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
            <span className="span">Register</span>
            <div className="text">Please Enter your details to register.</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              height={300}
              className="webcam"
              videoConstraints={{ facingMode: "user" }}
              style={{ transform: "scaleX(-1)" }}
            />
          </div>

          <input
            style={{
              marginTop: "10px",
            }}
            className="input1"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button
            type="submit"
            onClick={detectFaces}
            style={{
              width: "100%",
              backgroundColor: "white",
              color: "blue",
              marginTop: "10px",
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <div>
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
