const server = require("./api/server"); 
const dotenv = require("dotenv"); 
const mongoose = require("mongoose");

const cors = require("cors"); 

dotenv.config(); 

server.use(cors()); 
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    next(); 
})



//Connect to DB
mongoose.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => console.log("Connected to DB"))



const PORT = process.env.PORT || 4000; 


server.listen(PORT, () => console.log(`Listening on port ${PORT}`))