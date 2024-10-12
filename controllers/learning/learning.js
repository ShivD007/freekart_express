
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


// Note 3: Important
//find inside a reference
// Query to find a product with the given subProductId
//  const product = await Product.findOne({
//     subProducts: {
//       $elemMatch: { subProductId: mongoose.Types.ObjectId(subProductId) }
//     }
//   });

// -----------------------------------Or-----------------------------------
// const product = await Product.findOne({
//     'subProducts.subProductId': mongoose.Types.ObjectId(subProductId)
//   });


// Note 4:  Update

// check update.learning.js
