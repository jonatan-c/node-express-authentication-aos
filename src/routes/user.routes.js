const { Router } = require("express");
const router = Router();


const {
  createUser,
} = require("../controllers/user.controller");

router.post("/", createUser);

module.exports = router;
