require('dotenv').config();
const expect = require('expect');
const mongoose = require('mongoose');
const Note = require('../../models/note');
const NoteService = require('../../services/note');

describe('service notes', () => {
  before(() => {
    return mongoose.connect(process.env.MONGO_URI);
  });
  afterEach(() => {
    return Note.remove({});
  });
  it('should add a Note', async () => {
    const data = { title: 'test', content: 'test content' };
    const result = await NoteService.create(data);
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(result.title).toBe(data.title);
    expect(result.content).toBe(data.content);
  });

  it('should catch invalid schema', async () => {
    const data = { title: 'test' };
    try {
      const result = await NoteService.create(data);
      expect(result).not.toBeDefined();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should remove a Note', async () => {
    const data = { title: 'test', content: 'test content' };
    const document = await Note.create(data);
    const result = await NoteService.remove(document._id);
    expect(result).toBeDefined();
    expect(result).toBe(true);
  });

  it('should return Notes', async () => {
    const data = [
      { title: 'test', content: 'test content' },
      { title: 'test2', content: 'test content2' },
    ];
    await Note.create(data);
    let result = await NoteService.get({});
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    result = await NoteService.get({ title: 'test2' });
    expect(result).toBeDefined();
    expect(result.length).toBe(1);
  });

  it('should return Notes by id', async () => {
    const data = [
      { title: 'test', content: 'test content' },
      { title: 'test2', content: 'test content2' },
    ];
    const document = await Note.create(data);
    const result = await NoteService.getById(document[0]._id.toString());
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(result.title).toBe(data[0].title);
    expect(result.content).toBe(data[0].content);
  });

  it('should updateById a Note', async () => {
    const data = [
      { title: 'test', content: 'test content' },
      { title: 'test2', content: 'test content2' },
    ];
    const document = await Note.create(data);
    const updatedData = { title: 'test updated', content: 'test content' };
    const result = await NoteService.updateById(
      document[0]._id.toString(),
      updatedData,
      { overwrite: true },
    );
    expect(result).toBeDefined();
    expect(result.title).toBe(updatedData.title);
    expect(result.content).toBe(updatedData.content);
  });

  it('should updateById partially a Note', async () => {
    const data = [
      { title: 'test', content: 'test content' },
      { title: 'test2', content: 'test content2' },
    ];
    const document = await Note.create(data);
    const updatedData = { title: 'test updated' };
    const result = await NoteService.updateById(
      document[0]._id.toString(),
      updatedData,
    );
    expect(result).toBeDefined();
    expect(result.title).toBe(updatedData.title);
    expect(result.content).toBe(data[0].content);
  });
});
