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

// const allowedOrigins = ["http://localhost:3000", "https://bugpilot-frontend.herokuapp.com"];
// app.use(function(req, res, next) {
//   let origin = req.headers.origin;
//   console.log("origin",origin)
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
//   }

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });


app.use(express.json());
// app.options('*', cors())
app.use(cors());
app.use('/api',routes);
app.use('/',(req,res)=>{res.send('Welcome to bugpilot')})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

