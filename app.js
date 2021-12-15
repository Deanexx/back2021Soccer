const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cron = require("node-cron");

const app = express();

// importing routers

const userRouter = require("./router/userRouter");
const voteRouter = require("./router/voteRouter");

// importing controllers 

const appErrorHandler = require("./controllers/errorHandler");
const { createVote_cron } = require("./controllers/voteController");

// middlewares

app.use(function(req, res, next) {  
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});  

app.use(cookieParser());
app.use(express.json());
// app.use(cors({
// 	origin: "https://soccer2021front.herokuapp.com",
// 	// origin: "http://localhost:3000",
// 	credentials: true,
// }));

app.use(cors())

// scheduler every Sunday refresh voting

cron.schedule("0 0 * * SUN", () => {
	createVote_cron();
  });



// routering  

app.use("/user", userRouter);
app.use("/vote", voteRouter)
app.all("*", (req, res) => res.status(404).json(
	{
		status: "fail",
		message: `${req.originalUrl} isn't found`
	})
);

// error handler
app.use(appErrorHandler);

//exporting app
module.exports = app;