const db = require("../models");

exports.index = async function (req, res) {
  const department = await db.Department.findAll();
  res.status(200).json(department);
};

exports.store = async function (req, res) {
  try {
    const department = await db.Department.findOne({
      where: { label: req.body.label },
    });

    if (department) {
      res.status(409).json("This department already exist");
    } else {
      const newDepartment = await db.Department.create(req.body);
      res.status(200).json(newDepartment);
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

exports.update = async function (req, res) {
  try {
    const department = await db.Department.findByPk(req.params.id);

    if (!department) {
      res.status(404).json("This department does not exist");
    }

    const departmentUpdated = await db.Department.update(req.body);
    res.status(200).json(departmentUpdated);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async function (req, res) {
  try {
    const department = await db.Department.findByPk(req.params.id);

    if (!department) {
      res.status(404).json("This department does not exist");
    }

    await department.destroy();
    res.status(200).json("Staff has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
