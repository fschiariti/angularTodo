const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true }
});

todoSchema.method('transform', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});


module.exports = mongoose.model("Todo", todoSchema);
