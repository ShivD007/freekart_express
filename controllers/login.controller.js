import express from "express";
import mongoose from "mongoose";
import { UnauthorizationException } from "../response/apiError.js"
import { BadRequestException } from "../response/apiError.js"
import { User } from '../models/user.model.js'
import asyncHandler from '../response/asyncHandler.js'
import { AppStrings } from "../constants/app.strings.js";

const registerUser = async (req, res, next) => {
      console.log("Hello Registered....");
      // await asyncHandler((req, res, next) => {

      const { fullName, email, password, phoneNo } = req.body;
      if ([fullName, email, password, phoneNo].some((entry) => {
            return entry.trim() === ""
      })) {
            next(new BadRequestException(AppStrings.ALLPARAMETERREQUIRED));
      }


      const user = User.find({ email: email });
      console.log(user);
      // })
}




export { registerUser }