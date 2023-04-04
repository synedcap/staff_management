var express = require("express");
var router = express.Router();
var department = require("../controllers/DepartmentController");
const auth = require("../middleware/auth");

router.get("/", auth, department.index);
router.post("/store", auth, department.store);
router.put("/update/:id", auth, department.update);
router.delete("/delete/:id", auth, department.delete);

module.exports = router;
