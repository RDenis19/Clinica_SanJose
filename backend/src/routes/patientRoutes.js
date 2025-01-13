const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/authMiddleware");
const patientController = require("../controllers/patientController");

router.get('/',verifyJWT);

module.exports = router