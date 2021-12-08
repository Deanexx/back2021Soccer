require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose");
const app = require("./app");

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
  

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("DB is connected"))
.catch(err => console.log(err))

app.listen(process.env.PORT, () => {
    console.log("App is running on a port " + process.env.PORT)
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });