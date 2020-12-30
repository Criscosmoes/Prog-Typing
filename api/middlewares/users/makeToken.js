const jwt = require("jsonwebtoken"); 
const dotenv = require("dotenv"); 

dotenv.config(); 

const makeToken = user => {
    const payload = {
        subject: user.id, 
        username: user.name, 
    }
    const options = {
        expiresIn: "900s", 
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options); 
}


module.exports = {
    makeToken, 
}