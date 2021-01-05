const router = require("express").Router();
const User = require("../models/users");
const Score = require("../models/scores"); 

//libraries
const bcrypt = require("bcryptjs");

//middlewares
const { checkPayload } = require("../middlewares/users/checkPayload");
const { checkIfTaken } = require("../middlewares/users/checkIfTaken");
const { makeToken } = require("../middlewares/users/makeToken");
const { checkIfUserExists } = require("../middlewares/users/CheckIfUserExists");
const { accessToDetails } = require("../middlewares/users/accessToDetails"); 
const { isAuthorized } = require("../middlewares/users/isAuthorized");




// create/register a user
router.post("/register", [checkPayload, checkIfTaken], async (req, res) => {
  try {
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    await user.save();
    res.status(201).send({
      message: "Created Successfully!",
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// check if an email is taken in real time
router.post("/email", async (req, res) => {

  try {

    const { email } = req.body; 

    const [taken] = await User.find({email}); 

    if(taken){
      return res.status(400).json("Email already taken"); 
    }
    else {
      return res.status(200).json("Valid Email!")
    }


  }catch(e){
    res.status(500).send(e.message); 
  }


})


router.post("/username", async (req, res) => {

  try {
    const { username } = req.body; 

    const [taken] = await User.findOne({username}); 

    if(taken){
      return res.status(400).json("Username already taken"); 
    }
    else {
      return res.status(200).json("Valid Username!"); 
    }

  }catch(e){
    res.status(500).send(e.message); 
  }
})

// login the user
router.post("/login", [checkPayload, checkIfUserExists], async (req, res) => {
  try {
    const user = req.user;

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = makeToken(user);

      return res
        .status(200)
        .json({ message: `Welcome, ${user.username}`, token: token, id: user.id })
    } 
       else {
      res.status(400).json("Invalid credentials");

      }
  } catch (e) {
    res.status(500).send(e.message);
  }
});


// update user password only. Cannot update name/email for now. 
router.put("/update", [isAuthorized, accessToDetails], async (req, res) => {
  try {

    const { password } = req.body;

    if(!password || password.length < 5) return res.status(400).json("Please provide a valid password"); 

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    await User.updateOne({_id: req.userId}, {password: hashedPass}); 
    const currentUser = await User.find({_id: req.userId})

    res.status(200).send(currentUser)


  }catch(e){
    res.status(500).send(e.message); 
  }
})


// delete user
router.delete("/delete", [isAuthorized, accessToDetails], async (req, res) => {

  try {

    const [user] = await User.find({_id: req.userId}); 

    //removes user
    await user.remove(); 

    // remove all user scoers associated with account
    await Score.remove({owner: req.userId})

    res.status(200).json("User deleted successfully"); 

  }catch(e){
    res.status(500).send(e.message); 
  }

})


module.exports = router;
