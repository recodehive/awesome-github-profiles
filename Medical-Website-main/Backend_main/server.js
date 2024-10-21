const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing
const path = require('path');
const cors = require('cors');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true }, // Add this line if you want to keep username
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'doctor', 'admin'], required: true },
  specialization: { type: String }, // For doctors
  department: { type: String } // For admins
});
const User = mongoose.model('User', userSchema);

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // Use an environment variable for the secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true in production
}));

// Discussion forum route
app.get('/discussion-forum', (req, res) => {
  if (req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, '..', 'discussion-forum.html')); // Adjust the path
  } else {
    res.redirect('/login');
  }
});

//signup route

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, specialization, department, username } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists. Please log in', redirect: '/login' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user based on role
    const newUser = new User({
      name,
      email,
      username: username || email, // Use email as username if no username is provided
      password: hashedPassword,
      role,
      ...(role === 'doctor' && { specialization }),
      ...(role === 'admin' && { department })
    });

    await newUser.save();

    // Set session variables
    req.session.isLoggedIn = true;
    req.session.email = email;
    req.session.role = role;

    console.log('Signup successful, session variables set:', req.session);

    // Redirect based on user role
    let redirect = '/';
    if (role === 'doctor') redirect = '/doctor-dashboard';
    else if (role === 'admin') redirect = '/admin-dashboard';

    return res.status(201).json({ message: 'Signup successful', redirect });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error signing up' });
  }
});


// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('Login attempt:', email, 'Role:', role);
    
    let foundUser = await User.findOne({ email, role });
    if (!foundUser) {
      foundUser = await User.findOne({ email });
    }

    console.log('Found user:', foundUser ? 'Yes' : 'No');

    if (!foundUser) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');

    if (isMatch) {
      req.session.isLoggedIn = true;
      req.session.email = email;
      req.session.role = foundUser.role;

      console.log('Login successful:', email, 'Role:', foundUser.role);
      return res.json({ message: 'Login successful', redirect: '/' }); // Always redirect to home page
    } else {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error logging in' });
  }
});

// Check if user is logged in
app.get('/check-login', (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect('/discussion-forum');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html')); // Adjust the path to your login.html file
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html')); // Serve the index.html file
});

// Add this new route for doctor login
app.get('/doctor_login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'doctor_login.html'));
});

// Add this new route for admin login
app.get('/admin_login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin_login.html'));
});

// Add this route for doctor dashboard
app.get('/doctor-dashboard', (req, res) => {
  if (req.session.isLoggedIn && req.session.role === 'doctor') {
    res.sendFile(path.join(__dirname, '..', 'doctor-dashboard.html'));
  } else {
    res.redirect('/login');
  }
});

// Add this route for admin dashboard
app.get('/admin-dashboard', (req, res) => {
  if (req.session.isLoggedIn && req.session.role === 'admin') {
    res.sendFile(path.join(__dirname, '..', 'admin-dashboard.html'));
  } else {
    res.redirect('/login');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
