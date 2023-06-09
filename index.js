const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();

const path = require('path');
// const auth_data = require('./middleware/basic-auth');
const sankeyData = require('./routes/getallsankeys')
const GetAllsankeyValues = require('./routes/getsankeyvalues')
const users = require('./routes/users');
const auth = require('./routes/auth');
const forgot = require('./routes/forgot');
const edit = require('./routes/edit');
const reset = require('./routes/reset');
const energybalance = require('./routes/energyBalance');
const testEnergy = require('./routes/testEnergy');
const testEmission = require('./routes/testEmission');
const emission = require('./routes/emission');
const countries = require('./routes/countries');
const mapper = require('./routes/mapper');
const getnodes = require('./routes/getnodes');
const savesankey = require('./routes/savesankey');
const readysankeys = require("./routes/getreadysankeys")
const readysankeydata = require("./routes/readySankeyData")
const getsankey = require('./routes/getsankey');
const deletesankey = require('./routes/deletesankey');

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
app.use('/edit_profile', edit);

// Fetch data for countries
app.use('/countries', countries);

// Fetch Colors along with mapper
app.use('/mapper', mapper);

// Fetch data for Energy Balance sheet 
app.use('/energybalance', testEnergy);

// Fetch data for Emission sheet
app.use('/emission', testEmission);

// Nodes for sankey
app.use('/getnodes', getnodes); // Fetch

// Sankey data
app.use('/savesankey', savesankey)  // Save
app.use('/getsankey', getsankey);   // Load

//GetallSankeyData
app.use('/getsankeyvalues', GetAllsankeyValues);   // Load

// Fetch Sankey data
app.use('/getallsankeys', sankeyData); // Fetch

// Fetch readySankeys data
app.use('/sankeyread', readysankeys); // update

// Fetch readySankeys data
app.use('/sankeypublished', readysankeydata); // update

// Delete Sankey data
app.use('/deletesankey', deletesankey); // Fetch

// Test APIS
app.use('/testEmission', emission);
app.use('/testEnergy', energybalance);


// Making application production ready
// require('./config/prod')(app);  // Uncomment before deployment
 
app.get("*" ,(req, res)=>{
    return res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Connect to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at port ${port}`));