const dotenv = require("dotenv");
dotenv.config();

const express =require("express");
const axios = require("axios");
const cors =require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to remove Google Chrome alert
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self'");
  next();
});

// Middleware
const allowedOrigins = [
  "https://recodehive.github.io/awesome-github-profiles",
  "http://127.0.0.1:5502",
  "http://localhost:3000",
  "https://example.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

app.get("/api/auth/github", async(req,res)=>{
 try {
   const code = req.query.code;
   const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;
   const response = await axios.post(
     `https://github.com/login/oauth/access_token${params}`,
     { headers: { Accept: "application/json" } }
   );
   res.json({data:response.data});
 } catch (error) {
   console.log(error);
   res.status(500).json({
     message: "Internal Server Error",
   });
 }
})



app.get("/api/auth/github/getUser",async(req,res)=>{
    try {
      req.get("Authorization");
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: req.get("Authorization"),
        },
      });
      const { name, email } = await response.data;
      res.status(200).json({
        message: "success",
        user: {
          name: name,
          email: email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
})

// Start Server
app.listen(port, () => {
  console.log(
    `Backend listening on port http://localhost:${port}`
  );
});
