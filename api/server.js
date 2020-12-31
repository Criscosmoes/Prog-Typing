const express = require("express"); 
const helmet = require("helmet"); 
const cors = require("cors"); 



// gloabal middlwares
const { isAuthorized } = require("./middlewares/users/isAuthorized"); 

//import user routes
const UserRouter = require("./routes/user");
const ScoresRouter = require("./routes/scores") 

const server = express(); 

server.use(cors()); 
server.use(helmet());  
server.use(express.json()); 



server.use("/api", UserRouter)
server.use("/api", isAuthorized, ScoresRouter); 


module.exports = server; 