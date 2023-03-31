var express = require("express");
var router = express.Router();
var staff = require("../controllers/StaffController");
const auth = require("../middleware/auth");

router.get("/", auth, staff.index);
router.post("/store", auth, staff.store);

module.exports = router;
