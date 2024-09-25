import express from "express";
import mongoose from "mongoose";
import { ApiError, NotFoundException, UnauthorizationException, UniversalApiError } from "../response/apiError.js"
import { BadRequestException } from "../response/apiError.js"
import { User } from '../models/user.model.js'
import asyncHandler from '../response/asyncHandler.js'
import { AppStrings } from "../constants/app.strings.js";
import { ApiResponse } from "../response/response.js";
import bcrypt from "bcrypt";
import { passwordSaltCount as passwordSaltRound } from "../constants/app.constant.js";
import { errors } from "C:/Users/DELL/AppData/Local/Microsoft/TypeScript/5.5/node_modules/undici-types/index.js";

const registerUser = asyncHandler(async (req, res, next) => {

      const { fullName, email, password, phoneNo } = req.body;
      if ([fullName, email, password, phoneNo].some((entry) => {
            return entry.trim() === ""
      })) {
            next(new BadRequestException(AppStrings.ALLPARAMETERREQUIRED));
      }


      const existedUser = User.findOne({ email: email });

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

      const createdUser = User.findById(user._id).select(
            "-password -refreshToken",
      )

      if (!createdUser) {
            next(new UniversalApiError("Not able to create user! Internal Server error", 500));

      }

      res.status(200).send(new ApiResponse({ status: 200, message: "User Created successfully!", data: createdUser }));

})



const loginUser = asyncHandler(async (req, res, next) => {

      const { email, password } = req.body;
      if ([email, password].some((entry) => {
            return entry.trim() === ""
      })) {
            next(new BadRequestException(AppStrings.ALLPARAMETERREQUIRED));
      }


      const user = User.findOne({ email: email });

      if (!user) {
            next(new NotFoundException())
      }

      const isValidPassword = await bcrypt.compare(password, user.password);


      await User.create(
            {
                  fullName: fullName,
                  password: encryptedPassword,
                  phoneNo: phoneNo,
                  email: email
            }
      )

})





export { registerUser }