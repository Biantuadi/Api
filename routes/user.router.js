const express = require("express");
const router = express.Router();

const userCtrl = require("../ctrl/user.ctrl");
const auth = require("../middlewares/auth");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/users",  userCtrl.users);
router.get("/user/:id", auth, userCtrl.user);
router.put("/user/:id", auth, userCtrl.update);
router.delete("/user/:id", auth, userCtrl.delete);

module.exports = router;
