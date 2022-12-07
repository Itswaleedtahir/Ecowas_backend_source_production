const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();

const path = require('path');
const authentication = require('./middleware/auth');

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
app.use('/static', express.static('public/svg'));
app.use('/pics', express.static('public/profile'));
app.use(express.static(path.join(__dirname, "public")));   // Uncomment before deployment AND after adding build
// Cross-origin resourse sharing
app.use(cors());

// Fetching data in JSON format
app.use(express.json());

// Handle authentication
app.use('/users', users);
app.use('/auth', auth);
app.use('/forgot', forgot);
app.use('/reset_password', reset);
app.use('/edit_profile', authentication, edit);

// Fetch data for countries
app.use('/countries', authentication, countries);

// Fetch Colors
app.use('/mapper', mapper);

// Fetch data for Energy Balance sheet 
app.use('/energybalance', authentication, energybalance);

// Fetch data for Emission sheet
app.use('/emission', authentication, emission);

require('./config/prod')(app);  // Uncomment before deployment
 
app.get("*",(req, res)=>{
    return res.sendFile(path.resolve(__dirname, "./public/", "index.html"));
});

// Connect to port
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening at port ${port}`));