const accessToDetails = (req, res, next) => {

    try {
        const { subject, username } = req.decodedToken; 
        req.userId = subject; 
        req.username = username

    
        next(); 
      }
      catch(e){
        res.status(500).send(e.message); 
      }
}

module.exports = {
    accessToDetails, 
}