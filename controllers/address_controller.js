import { AppStrings } from "../constants/app.strings.js";
import { Address } from "../models/address.model.js";
import { User } from "../models/user.model.js";
import { BadRequestException, ServerApiError } from "../response/apiError.js";
import asyncHandler from "../response/asyncHandler.js";
import { ApiResponse } from "../response/response.js";


const updateUserAddress = asyncHandler(async (req, res, next) => {
    const address = req.body.address
    const pincode = req.body.pincode
    const alternateMobileNo = req.body.alternateMobileNo
    const userId = req.headers.users.id;

    let user = await User.findById(userId);

    if (!address || !pincode || !alternateMobileNo || !userId) {
        next(new BadRequestException(AppStrings.allParamsRequired));
    }

    if (!user) {
        next(new BadRequestException(AppStrings.userNotFound))
    }
    console.log(user.address);
    if (user.address) {
        const addressObj = await Address.findByIdAndUpdate(user.address, { address, pincode, alternateMobileNo }, { new: true })
        user.address = addressObj._id;
        await user.save();

        console.log(addressObj);

    } else {
        console.log("point 0")

        const addressObj = new Address({ address, alternateMobileNo, pincode });
        console.log(`point 1 ${addressObj}`)
        await addressObj.save();
        console.log("point 2")

        user.address = addressObj._id;
        await user.save();
        console.log("point 3")

        console.log(user);

    }

    user = await User.findById(userId).populate("address").select('-password');


    res.status(200).send(new ApiResponse({
        status: 200, message: "User Updated successfully!",
        data: user
    },))
})



export { updateUserAddress };