import { ApiError, NotFoundException, ServerApiError, UnauthorizationException, UniversalApiError } from "../response/apiError.js"
import { BadRequestException } from "../response/apiError.js"
import { User } from '../models/user.model.js'
import asyncHandler from '../response/asyncHandler.js'
import { AppStrings } from "../constants/app.strings.js";
import { ApiResponse } from "../response/response.js";
import bcrypt from "bcrypt";
import { passwordSaltCount as passwordSaltRound } from "../constants/app.constant.js";
import { createToken } from "./token_controller.js";
import { Address } from "../models/address.model.js";


const registerUser = asyncHandler(async (req, res, next) => {

      const { fullName, email, password, phoneNo } = req.body;
      if ([fullName, email, password, phoneNo].some((entry) => {
            return entry.trim() === ""
      })) {
            next(new BadRequestException(AppStrings.allParamsRequired));
      }


      const existedUser = await User.findOne({ email: email });
      if (existedUser) {
            res.status(200)
                  .send(new ApiResponse({ status: 200, message: "User Already exists", data: null }))
            return;
      }

      const encryptedPassword = await bcrypt.hash(password, passwordSaltRound);


      const user = await User.create(
            {
                  fullName: fullName,
                  password: encryptedPassword,
                  phoneNo: phoneNo,
                  email: email
            }
      )

      const createdUser = await User.findById(user._id).select(
            "-password",
      )

      console.log(createdUser);

      if (!createdUser) {
            next(new UniversalApiError("Not able to create user! Internal Server error", 500));
      }

      res.status(200).send(new ApiResponse({ status: 200, message: "User Created successfully!", data: createdUser }));

})



const loginUser = asyncHandler(async (req, res, next) => {

      // take email and password from user
      // validate
      // check if email is exist or not
      // check if given password is correct or not
      // create refresh Token  with 10 days expiry
      // create accessToken with 1 day expiry

      console.log(req.body)

      const { email, password } = req.body;

      if ([email, password].some((entry) => {
            return entry.trim() === ""
      })) {
            next(new BadRequestException(AppStrings.allParamsRequired));
      }


      const user = await (User.findOne({ email: email }).populate("address"));
      if (!user) {
            next(new NotFoundException({ "NON": 1 }))
            return;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);


      if (!isValidPassword) {
            throw new UnauthorizationException({ message: AppStrings.allParamsRequired });
      }

      delete user.password;

      const refreshToken = createToken({ payload: { email: user.email, phoneNo: user.phoneNo, id: user._id }, expiryTime: 24 * 60 })
      const accessToken = createToken({ payload: { email: user.email, phoneNo: user.phoneNo, id: user._id }, expiryTime: 10 })



      res.status(200).send(new ApiResponse({
            status: 200, message: "User Logined successfully!",
            data: { ...{ id: user._id, email: user.email, phoneNo: user.phoneNo, fullName: user.fullName, address: user.address }, refreshToken, accessToken },
      },
      ));
})





export { registerUser, loginUser }