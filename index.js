const express = require('express');
const app = express();

const connectDB = require('./config/db');

const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
connectDB();

const homeRoutes = require('./routers/homeRoutes');


app.use('/home', homeRoutes);

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