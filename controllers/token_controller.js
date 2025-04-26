import { User } from "../models/user.model.js";
import { BadRequestException, TokenExpirationException } from "../response/apiError.js";
import asyncHandler from "../response/asyncHandler.js";
import jwt, { decode } from "jsonwebtoken"
import { ApiResponse } from "../response/response.js";


const createToken = ({ payload, expiryTime }) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: expiryTime != null ? expiryTime * 20 * 60 : null })
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



const createTokenUsingRefreshToken = asyncHandler((req, res, next) => {
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



    const refreshToken = createToken({ payload: { email: decodedUser.email, phoneNo: decodedUser.phoneNo, id: decodedUser._id }, expiryTime: 24 })
    const accessToken = createToken({ payload: { email: decodedUser.email, phoneNo: decodedUser.phoneNo, id: decodedUser._id }, expiryTime: 1 })



    console.log(refreshToken);
    console.log(accessToken);
    res.status(200).send(new ApiResponse({
        status: 200, message: "Token generated!",
        data: { ...decodedUser, accessToken, refreshToken },
    }))




})

export { createToken, tokenAuthentication, createTokenUsingRefreshToken };