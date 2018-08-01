const mongoose = require('mongoose');
const Note = mongoose.model('note');

exports.create = async data => {
  const note = await new Note(data).save();
  return note;
};

exports.updateById = async (id, updatedData) => {
  const note = await Note.findByIdAndUpdate({ _id: id }, updatedData, {
    new: true, //return the new note instead of the old one
  });
  return note;
};

exports.remove = async id => {
  const note = await Note.findByIdAndRemove({ _id: id });
  if (!note) {
    throw new Error('error');
  }
  return true;
};

exports.get = async data => {
  const notes = await Note.find(data);
  return notes;
};

exports.getById = async id => {
  const note = await Note.findById(id);
  return note;
};
