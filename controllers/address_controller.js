

const updateUserAddress = asyncHandler(async (req, res, next) => {
    const address = req.body.address
    const userId = req.body.userId;

    const user = User.findById(userId);

    if (!user) {
        next(new BadRequestException(AppStrings.userNotFound))
    }

    const updatedUser = await user.updateOne({ id: userId }, { "$set": { address: address } });
    if (!updatedUser) {
        next(new ServerApiError(AppStrings.serverError));
    }

    res.status(200).send(new ApiResponse({
        status: 200, message: "User Updated successfully!",
        data: updatedUser
    },))
})



export { updateUserAddress };