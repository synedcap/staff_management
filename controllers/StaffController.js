const db = require("../models");
const { staffCreateRequest } = require("../validations/StaffCreateRequest");

/*get staff list*/
exports.index = async function (req, res) {
  const staff = await db.Staff.findAll({
    include: [
      {
        model: db.Department,
      },
    ],
  });
  res.status(200).json(staff);
};

/*store a staff*/
exports.store = async function (req, res) {
  try {
    //validation of the requests

    const result = await staffCreateRequest.validateAsync(req.body, {
      abortEarly: false,
    });

    const staff = await db.Staff.findOne({ where: { email: result.email } });

    if (!staff) {
      //save staff and send status
      const newStaff = await db.Staff.create(req.body);
      res.status(200).json(newStaff);
    } else {
      res.status(409).json("This staff member already exist");
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

/*update  a staff */
exports.update = async function (req, res) {
  try {
    const staff = await db.Staff.findByPk(req.params.id);

    if (!staff) {
      return res.status(404).json("Staff not found");
    }

    await staff.update(req.body);
    res.status(200).json("staff has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

/*delete a staff*/
exports.delete = async function (req, res) {
  try {
    const staff = await db.Staff.findByPk(req.params.id);

    if (!staff) {
      return res.status(404).json("Staff not found");
    }

    await staff.destroy();
    res.status(200).json("Staff has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
