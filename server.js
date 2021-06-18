require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes=require('./routes')

const app = express();//this is server
const port = process.env.PORT || 5000;

var corsOptions = {
    origin: ['http://localhost:3000', 'https://bugpilot-frontend.herokuapp.com'],
    credentials: true,
    preflightContinue: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.options('*', cors())
app.use('/api',routes);
app.use('/',(req,res)=>{res.send('Welcome to bugpilot')})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

