import { User } from "../models/user.model.js";
import { BadRequestException, TokenExpirationException } from "../response/apiError.js";
import asyncHandler from "../response/asyncHandler.js";
import jwt, { decode } from "jsonwebtoken"
import { ApiResponse } from "../response/response.js";


const createToken = ({ payload, expiryTime }) => {
    console.log(payload)
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: expiryTime != null ? expiryTime * 60 : null })
    return token;
}

const tokenAuthentication = asyncHandler(async (req, res, next) => {
    const token = req.body.accessToken || req.query.accessToken || req.headers.authorization
    if (!token) {
        next(new BadRequestException("Jwt Token Required!"))
    }
    const decodedUser = jwt.verify(token, process.env.JWT_KEY, (error, user) => {
        if (!error) {
            return user;
        }
        if (error.name === "TokenExpiredError") {
            next(new TokenExpirationException());
        } else {
            next(new BadRequestException(error.message));
        }
    });
    req.headers.users = decodedUser;
    next();
})



const createTokenUsingRefreshToken = asyncHandler(async (req, res, next) => {
    const token = req.body.refreshToken;

    if (!token) {
        next(new BadRequestException("Jwt Token Required!"))
    }

    console.log(token);
    let decodedUser;
    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
        if (error) {
            if (error?.name === "TokenExpiredError") {
                next(new TokenExpirationException());
            } else {
                next(new BadRequestException(error.message));
            }
        }

        decodedUser = user;
    });
    if (!decodedUser) {
        next(new BadRequestException())

    }
    console.log("-----------------")
    console.log(decodedUser)
    const user = await User.findById(decodedUser.id).populate("address").select("-password");

    const refreshToken = createToken({ payload: { email: decodedUser.email, phoneNo: decodedUser.phoneNo, id: decodedUser.id }, expiryTime: 24 * 60 })
    const accessToken = createToken({ payload: { email: decodedUser.email, phoneNo: decodedUser.phoneNo, id: decodedUser.id }, expiryTime: 2 })


    res.status(200).send(new ApiResponse({
        status: 200, message: "Token generated!",
        data: { ...user.toObject(), accessToken, refreshToken },
    }))




})

export { createToken, tokenAuthentication, createTokenUsingRefreshToken };