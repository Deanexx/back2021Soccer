const userModel = require("./../models/userModel");

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.login = catchAsync(async ({ body, cookies }, res, next) => {
    if("userSF" in cookies)
        return next(new AppError("User is logged in"));

    const { name } = body;
    const user = await userModel.findOne({ name }).select("-__v")

    if (!user) 
        return next(new AppError("User not found", 401))
    
    return res
        .cookie("userSF", user, { maxAge: 3000 * 24 * 60 * 60 * 1000 })
        .status(201)
        .json(user)
})

exports.register = catchAsync(async ({ body, cookies }, res, next) => {
    if("userSF" in cookies)
        return next(new AppError("User is logged in"));

    const { name } = body;
    const user = await userModel.findOne({ name }).select("-__v")

    if (user) 
        return next(new AppError("User is existed with this Name", 401))
    const newUser = await userModel.create({ name })
    delete newUser["__v"];
    return res
            .cookie("userSF", newUser, { maxAge: 3000 * 24 * 60 * 60 * 1000 })
            .status(201)
            .json(newUser);
})

exports.updateName = catchAsync(async ({ body, cookies }, res, next) => {
    if(!("userSF" in cookies && "_id" in cookies.user))
        return next(new AppError("User is not signed in"))

    const user = await userModel.findById(cookies.user._id);

    if (!user)
        return next(new AppError("No user in db, please try to relogin!"))
    user.name = body.name;
    user.save();
    return res
        .cookie("userSF", user, { maxAge: 3000 * 24 * 60 * 60 * 1000 })
        .sendStatus(204)
})

exports.signOut = async ( _, res) => {
    return res
        .cookie("userSF", null,  { maxAge: -1 })
        .sendStatus(204);
}