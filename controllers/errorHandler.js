module.exports = function (err, _, res, next) {
    if (err.name.startsWith("ValidationError")){
      err.statusCode = 400;
      err.message = "Validation Error! Your name is more then 3 letters"
    }

    res.status(err.statusCode).json({ message: err.message })
  }