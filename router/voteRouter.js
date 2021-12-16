const express = require("express");
const router = express.Router();
const { createVote, addUser, deleteUser, setGoals, getVote, setMap, createSimple, removeGoals } = require("./../controllers/voteController")

router
    .get("/create", createVote)
    .get("/getvote", getVote)
    .post("/adduser", addUser)
    .get("/removegoals", removeGoals)
    .get("/createsimple", createSimple)
    .post("/deleteuser", deleteUser)
    .patch("/setGoals", setGoals)
    .patch("/setMap", setMap)

module.exports = router;