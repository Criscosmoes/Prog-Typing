const express = require("express"); 
const cors = require("cors"); 
const helmet = require("helmet"); 

const server = express(); 

// gloabal middlwares
const { isAuthorized } = require("./middlewares/users/isAuthorized"); 

//import user routes
const UserRouter = require("./routes/user");
const ScoresRouter = require("./routes/scores") 

server.use(helmet()); 
server.use(cors()); 
server.use(express.json()); 


server.use("/api", UserRouter)
server.use("/api", isAuthorized, ScoresRouter); 


module.exports = server; 