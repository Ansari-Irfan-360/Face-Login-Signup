# Face Login Signup

Face Login Signup is a web application that enables users to register and log in using facial recognition technology. Users can sign up by capturing a photo of their face via the camera and providing their name, and then log in using only their face.

## Table of Contents

- [Face Login Signup](#face-login-signup)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Demo](#demo)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Acknowledgements](#acknowledgements)

## Introduction

Face Login Signup is a novel way of authentication using facial recognition. It utilizes the face-api.js library for face detection and recognition. Users can easily sign up and log in by capturing their face via the camera.

## Features

- User signup using facial recognition
- User login using facial recognition
- Secure authentication process
- User-friendly interface

- ## Demo

Check out the [live demo](https://face-login-signup.vercel.app/) to see Face Login Signup in action!

## Tech Stack

**Client:**

- React
- react-webcam
- axios

**Server:**

- Node.js
- Express
- MongoDB with Mongoose
- face-api.js

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Ansari-Irfan-360/AI-Music-Player.git
    cd face-login-signup
    ```

2. Install client dependencies:

    ```sh
    cd client
    npm install
    ```

3. Install server dependencies:

    ```sh
    cd ../server
    npm install
    ```

4. Create a `.env` file in the `server` directory and add your MongoDB URI and CORS URL:

    ```env
    MONGO_URL=your_mongodb_url
    CORS_URL=your_client_url (for local hosting http://localhost:3000)
    ```

5. Start the server:

    ```sh
    npm start
    ```

6. Start the client:

    ```sh
    cd ../client
    npm start
    ```

The client will run on `http://localhost:3000` and the server will run on `http://localhost:5000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Click on the "Sign Up" link to register by capturing your face and providing your name.
3. After successful registration, click on the "Login" link to log in using facial recognition.

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [face-api.js](https://github.com/justadudewhohacks/face-api.js/)
