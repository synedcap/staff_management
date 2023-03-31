var bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require('jsonwebtoken');
const {loginRequest} = require('../validations/LoginRequest');

/*login*/
exports.login = async function (req, res) {
  try {

    //validation of the requests
    const result = await loginRequest.validateAsync(req.body,{
      abortEarly: false
     });

    //search user
    const user = await db.User.findOne({ where: { userName: result.username } });

    if (!user) {
      res.status(404).json("user not found");
    } else {
      //check that password are the same
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (password_valid) {
       
        //generate token
        const token = jwt.sign(
          {
            username: user.username,
            userId: user.id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        console.log(token);
        
        res.status(200).json({
          message: "Authentication successful",
          token: token,
        });
      } else {
        res.status(400).json("Wrong password");
      }
    }
  } catch (err) {

     //check if error comes from joi validation
     if (err.isJoi === true) {
      err.status = 422;
      res.status(422).json(err.details);
    }
    res.status(500).json(err);
  }
};


/*logout*/
exports.logout =  function (req, res) {
  // Set the token expiration time to a past date
  res.cookie('token', '', { expires: new Date(0) });

  res.json({ message: 'Logged out successfully' });
};

