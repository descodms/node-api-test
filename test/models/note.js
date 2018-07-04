require('dotenv').config();
const expect = require('expect');
const mongoose = require('mongoose');
const Note = require('../../models/note');
describe('model Note', () => {
  before(() => {
    return mongoose.connect(process.env.MONGO_URI);
  });

  it('should create a Note model', () => {
    const note = new Note();
    expect(note).toBeDefined();
  });

  it('should create a Note document', async () => {
    const data = {title: 'test', content: 'test content'};
    const document = await Note.create(data);
    expect(document.title).toBe(data.title);
    expect(document.content).toBe(data.content);
  });

  it('should catch invalid schema', async () => {
    const data = {title: 'test'};
    const note = new Note(data);
    expect(note).toBeDefined();
    try {
      const document = await note.save();
      expect(document).toNotExist();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});