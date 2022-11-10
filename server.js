const express = require("express");
const path = require("path");
const cors = require('cors');
require('dotenv').config();
const logger = require(`${__dirname}/services/logger`);
const app = express();
app.use(express.json());



const corsOptions = {
  origin: ['http://localhost']
}

app.use(cors(corsOptions));

// Define Routes

app.use("/api/token", require("./routes/token"));
app.get("*",(req,res)=>{
  res.json("Hello user, Server is Active for you.");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`200 : Server started on port ${PORT}`));