
//Note 1: for populate nested model

// const posts = await Post.find()
//         .populate('author')  // Populate the author of the post
//         .populate({
//             path: 'comments',  // Populate the comments of the post
//             populate: {
//                 path: 'author',  // Inside each comment, populate the author of the comment
//                 model: 'User'    // Reference to the User collection
//             }
//             This above populate can be list
//             in case of multiple populate
//         })

// Note 2: Pagination
// getAllProduct- product_controller.js