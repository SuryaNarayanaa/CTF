const express = require('express');
const app = express();

const connectDB = require('./config/db');

const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
connectDB();

const homeRoutes = require('./routers/homeRoutes');
const authRoutes = require('./routers/authRoutes');
const adminRoutes = require('./routers/adminRoutes');
const ctfRoutes = require('./routers/ctfRoutes');
const teamRoutes = require('./routers/teamRoutes');


app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/ctf', ctfRoutes);
app.use('/home', homeRoutes);
app.use('/team', teamRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});