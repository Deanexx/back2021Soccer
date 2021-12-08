const express = require("express");
const router = express.Router();
const { createVote, addUser, deleteUser, setGoals, getVote, setMap, createSimple, removeGoals } = require("./../controllers/voteController")

router
    .get("/create", createVote)
    .get("/getvote", getVote)
    .get("/adduser", addUser)
    .get("/removegoals", removeGoals)
    .get("/createsimple", createSimple)
    .delete("/deleteuser", deleteUser)
    .patch("/setGoals", setGoals)
    .patch("/setMap", setMap)

module.exports = router;