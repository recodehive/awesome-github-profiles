const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
  "https://recodehive.github.io/awesome-github-profiles",
  "http://127.0.0.1:5502",
  "http://127.0.0.1:5501",
  "http://localhost:3000",
  "https://example.com"
];

const path = require('path');
app.use(express.static(path.join(__dirname)));

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// GitHub OAuth route
app.get("/api/auth/github", async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ message: "Authorization code is required" });
    }

    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error_description || response.data.error);
    }

    res.json({ data: response.data });
  } catch (error) {
    console.error('GitHub OAuth error:', error.response?.data || error);
    res.status(error.response?.status || 500).json({
      message: "Failed to authenticate with GitHub",
      error: error.message
    });
  }
});

// Get GitHub user data route
app.get("/api/auth/github/getUser", async (req, res) => {
  try {
    const authHeader = req.get("Authorization");
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Invalid authorization header" });
    }

    const token = authHeader.split(' ')[1];

    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });

    res.status(200).json({
      message: "success",
      user: {
        name: response.data.name,
        email: response.data.email
      }
    });
  } catch (error) {
    console.error('GitHub user data error:', error.response?.data || error);
    res.status(error.response?.status || 500).json({
      message: "Failed to fetch user data",
      error: error.message
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
