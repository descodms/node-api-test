const NoteServices = require('../services/note');

exports.addNote = async (req, res) => {
  const note = await NoteServices.create(req.body);
  res.send(note);
};

exports.updateById = async (req, res) => {
  const note = await NoteServices.updateById(req.params.id, req.body);
  res.send(note);
};

exports.remove = async (req, res) => {
  const note = await NoteServices.remove(req.params.id);
  if (note) {
    res.send(true);
  } else {
    res.send(false);
  }
};

exports.get = async (req, res) => {
  const notes = await NoteServices.get();
  res.send(notes);
};

exports.getById = async (req, res) => {
  const note = await NoteServices.getById(req.params.id);
  res.send(note);
};
