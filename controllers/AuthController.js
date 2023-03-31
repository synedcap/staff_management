var bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const { loginRequest } = require("../validations/LoginRequest");

/*login*/
exports.login = async function (req, res) {
  try {
    //validation of the requests
    const result = await loginRequest.validateAsync(req.body, {
      abortEarly: false,
    });

    //search user
    const user = await db.User.findOne({
      where: { userName: result.username },
    });

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

        await user.update({ token });

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
exports.logout = async function (req, res) {

  const { userId } = req.decodedToken;

  // Update the token field to null for the corresponding user
  await db.User.update({ token: null }, { where: { id: userId } });

  res.send({ message: 'Logged out successfully' });
  
};
