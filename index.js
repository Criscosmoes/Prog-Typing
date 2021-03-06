const server = require("./api/server"); 
const dotenv = require("dotenv"); 
const mongoose = require("mongoose");
const cors = require("cors"); 

server.use(cors()); 


dotenv.config(); 





//Connect to DB
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, () => console.log("Connected to DB")); 

const PORT = process.env.PORT || 4000; 

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))