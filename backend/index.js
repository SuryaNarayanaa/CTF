const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

const allowedOrigins = ['https://hiddenx.vercel.app',"https://hidden-x-backend.onrender.com","https://hashx-ruby.vercel.app/" ,'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight across-the-board


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'your-secret-key', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
const homeRoutes = require('./routers/homeRoutes');
const authRoutes = require('./routers/authRoutes');
const adminRoutes = require('./routers/adminRoutes');
const ctfRoutes = require('./routers/ctfRoutes');
const teamRoutes = require('./routers/teamRoutes');

app.use('/auth', authRoutes);
app.use('/Admin', adminRoutes);
app.use('/ctf', ctfRoutes);
app.use('/home', homeRoutes);
app.use('/team', teamRoutes);

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});