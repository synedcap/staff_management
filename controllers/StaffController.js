const db = require("../models");
const { staffCreateRequest } = require("../validations/StaffCreateRequest");

/*get staff list*/
exports.index = async function (req, res) {

  const staff = await db.Staff.findAll();
  res.status(200).json(staff);

};

/*store a staff*/
exports.store = async function (req, res) {
  try {
    //validation of the requests

    const result = await staffCreateRequest.validateAsync(req.body, {
      abortEarly: false,
    });

    //verify if staff exists
    const staff = await db.Staff.findOne({ where: { email: result.email } });

    if (!staff) {
      //save user and send status
      const newStaff = await db.Staff.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        post: req.body.post,
        dateOfStart: req.body.dateOfStart,
      });

      res.status(200).json(newStaff);
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
