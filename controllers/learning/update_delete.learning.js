//::::::::: Update:::::::::::
// updateOne()

// Updates a single document that matches the query.
//     Syntax:
// javascript
// Copy code
// Model.updateOne(filter, update, options).then(...);
// updateMany()

// Updates all documents that match the query.
//     Syntax:
// javascript
// Copy code
// Model.updateMany(filter, update, options).then(...);
// findOneAndUpdate()

// Finds a single document and updates it.Returns the original or updated document based on options.
//     Syntax:
// javascript
// Copy code
// Model.findOneAndUpdate(filter, update, options).then(...);
// findByIdAndUpdate()

// Finds a document by its ID and updates it.Similar to findOneAndUpdate().
//     Syntax:
// javascript
// Copy code
// Model.findByIdAndUpdate(id, update, options).then(...);




// Options
// new: If set to true, returns the modified document rather than the original.
// upsert: If set to true, creates a new document if no document matches the query.
// runValidators: If set to true, runs schema validators on the update.


// Update Operators
// $set: Sets the value of a field.
// $unset: Removes a field.
// $inc: Increments the value of a field.
// $push: Adds an item to an array.
// $pull: Removes an item from an array.



Important Note: { timestamps: true } to ensure updatedAt timestamp updation...44




Delete functionalty is same as Update :

structure:
// Model.findByIdAndDelete(id).then(...);
// Model.findOneAndDelete({filter condition}).then(...);
