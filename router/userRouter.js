const express = require("express");
const router = express.Router();
const { login, register, updateName, signOut } = require("./../controllers/userController")

router
    .get("/signOut", signOut)
    .post("/login", login)
    .post("/register", register)
    .patch("/updateName", updateName)

module.exports = router;