var express = require("express");
var router = express.Router();
var staff = require("../controllers/StaffController");
const auth = require("../middleware/auth");

router.get("/", auth, staff.index);
router.post("/store", auth, staff.store);
router.put("/update/:id", auth, staff.update);
router.get("/edit/:id", auth, staff.edit);
router.delete("/delete/:id", auth, staff.delete);

module.exports = router;
