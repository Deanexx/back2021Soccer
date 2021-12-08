const voteModel = require("./../models/voteModel");

const catchAsync = require("./../utils/catchAsync")
const AppError = require("../utils/appError");

function is_cookie(cookies){
    return ("userSF" in cookies && "_id" in cookies["userSF"]) ? cookies.userSF._id : null;
}

exports.getVote = async(_, res) => {
    const vote = await voteModel
        .findOne({ active: true})
        .populate("users isGoals")
        .select("-__v")
    
    
    return res
        .status(200)
        .json(vote)
}

exports.createSimple = catchAsync(async(_, res) => {
    const vote = await voteModel.create({});
    return res.status(200).json(vote);
})

exports.createVote = catchAsync(async ( _, res) => {
    const vote = await voteModel.findOne({ active: true });
    await voteModel.deleteMany();
    const result = await voteModel.create({ location: { coordinates: vote.location.coordinates } });

    return res
        .status(201)
        .json(result)
})

exports.createVote_cron = async () => {
    const vote = await voteModel.findOne({ active: true });

    await voteModel.deleteMany();
    const result = await voteModel.create({ location: { coordinates: vote.location.coordinates } });

    return true;
}

exports.addUser = catchAsync(async ({ cookies }, res, next) => {
    const userID = is_cookie(cookies);
    if(!userID)
        return next(new AppError("User is not logged in", 400))
    const vote = await voteModel.findOne({ active: true })
    if(vote.users.includes(userID)) 
        return next(new AppError("User already exists in vote", 400))
    vote.users.push(userID)
    vote.save();

    return res.sendStatus(204)
})

exports.deleteUser = catchAsync(async ({ cookies }, res, next) => {
    const userID = is_cookie(cookies);

    if(!userID)
        return next(new AppError("User is not logged in", 400))

    const vote = await voteModel.findOne({ active: true });
    vote.users = await vote.users.filter(el => el != userID);
    vote.save();

    return res.sendStatus(204);
})

exports.setGoals = catchAsync(async ( { cookies } , res, next) => {
    const user = is_cookie(cookies);
    if(!user)
        return next(new AppError("User is not logged in", 400))
    
    const vote = await voteModel
        .findOne({ active: true })
    if(vote.isGoals)
        return next(new AppError("Can't overight, goals already set", 400))
    await voteModel.updateOne({ active: true }, { isGoals: user } )

    return res.sendStatus(204);
})

exports.setMap = catchAsync( async ({ body }, res, next) => {
    const { lat, lng } = body;
    if (!lat || !lng) return next(new AppError("No value provided!", 400));

    const vote = await voteModel
        .updateOne({ active: true }, { $set: { "location.coordinates" : [lat, lng] }})

    return res
        .sendStatus(200)
})


exports.removeGoals = catchAsync(async ( { cookies } , res, next) => {
    const user = is_cookie(cookies);
    if(!user)
        return next(new AppError("User is not logged in", 400))
    
    const vote = await voteModel
        .findOne({ active: true })

    await voteModel.updateOne({ active: true }, { isGoals: null } )

    return res.sendStatus(200);
})