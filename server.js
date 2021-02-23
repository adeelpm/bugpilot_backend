const express = require('express');
const cors = require('cors');
const mysql=require('mysql');
const routes=require('./routes')

const app = express();//this is server
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api',routes);
app.use('/',(req,res)=>{res.send('Welcome to bugpilot')})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

