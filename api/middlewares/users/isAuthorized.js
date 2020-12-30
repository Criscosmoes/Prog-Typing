const jwt = require("jsonwebtoken"); 




const isAuthorized = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
      res.status(401).json("token required")
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
          res.status(401).json("token invalid")
        } else {
          req.decodedToken = decoded
          next();
        }
      })
    }
}


module.exports = {
    isAuthorized, 
}

