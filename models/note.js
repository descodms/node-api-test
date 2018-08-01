const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please enter a title',
  },
  content: {
    type: String,
    required: 'Please enter a content',
  },
});

noteSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('note', noteSchema);
