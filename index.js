const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();

const path = require('path');
const auth_data = require('./middleware/auth');

const users = require('./routes/users');
const auth = require('./routes/auth');
const forgot = require('./routes/forgot');
const edit = require('./routes/edit');
const reset = require('./routes/reset');
const energybalance = require('./routes/energyBalance');
const emission = require('./routes/emission');
const countries = require('./routes/countries');
const mapper = require('./routes/mapper');

// Checking ENV variables
if (!process.env.jwtPrivateKey) {
    console.log("FATAL ERROR: JWT (Token) Private Key not defined.");
    process.exit(1);
}

// Serve static files
app.use(express.static(path.join(__dirname, "public")));   // Uncomment before deployment AND after adding build

app.use('/flags', express.static('public/flags'));
app.use('/pics', express.static('public/profile'));
app.use('/nodes', express.static('public/nodes'));

// Allow cross-origin resourse sharing
app.use(cors());

// Fetching data in JSON format
app.use(express.json());

// Handle authentication
app.use('/users', users);
app.use('/auth', auth);
app.use('/forgot', forgot);
app.use('/reset_password', reset);
app.use('/edit_profile', auth_data, edit);

// Fetch data for countries
app.use('/countries', auth_data, countries);

// Fetch Colors along with mapper
app.use('/mapper', mapper);

// Fetch data for Energy Balance sheet 
app.use('/energybalance', auth_data, energybalance);

// Fetch data for Emission sheet
app.use('/emission', auth_data, emission);

// Making application production ready
// require('./config/prod')(app);  // Uncomment before deployment
 
app.get("*" ,(req, res)=>{
    return res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Connect to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at port ${port}`));