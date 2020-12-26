const server = require("./api/server"); 
const dotenv = require("dotenv"); 
const mongoose = require("mongoose"); 

dotenv.config(); 


//Connec to DB
mongoose.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true, useNewUrlParser: true }, () => console.log("Connected to DB"))



const PORT = process.env.PORT || 4000; 

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))