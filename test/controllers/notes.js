require('dotenv').config();
const expect = require('expect');
const request = require('supertest');
const server = require('../../app');
const Note = require('../../models/note');

describe('controllers notes', () => {
  afterEach(() => {
    return Note.remove({});
  });

  //anda
  it('should add a Note', async () => {
    const data = { title: 'test', content: 'test content' };
    const response = await request(server)
      .post('/notes')
      .send(data) // sends a JSON post body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    const note = response.body;
    expect(note.title).toBe(data.title);
    expect(note.content).toBe(data.content);
  });

  //anda
  it('should remove a Note', async () => {
    const data = { title: 'test', content: 'test content' };
    const document = await Note.create(data);
    const response = await request(server)
      .delete('/notes/' + document._id.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    const result = response.body;
    expect(result).toBeDefined();
    expect(result).toBe(true);
  });

  //anda
  it('should return Notes', async () => {
    const data = [
      { title: 'test', content: 'test content' },
      { title: 'test2', content: 'test content2' },
    ];
    await Note.create(data);
    const response = await request(server)
      .get('/notes')
      .send(data) // sends a JSON post body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    const note = response.body;
    expect(note).toBeDefined();
    expect(note.length).toBe(2);
  });

  //anda
  it('should return Notes by id', async () => {
    const data = [
      { title: 'test', content: 'test content' },
      { title: 'test2', content: 'test content2' },
    ];
    const document = await Note.create(data);
    const response = await request(server)
      .get('/notes/' + document[0]._id.toString())
      .send(data) // sends a JSON post body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    const note = response.body;
    expect(note).toBeDefined();
    expect(note._id).toBeDefined();
    expect(note.title).toBe(data[0].title);
    expect(note.content).toBe(data[0].content);
  });

  //anda
  it('should updateById a Note', async () => {
    const data = [
      { title: 'test', content: 'test content' },
      { title: 'test2', content: 'test content2' },
    ];
    const document = await Note.create(data);
    const updatedData = { title: 'test updated', content: 'test content' };
    const response = await request(server)
      .put('/notes/' + document[0]._id.toString())
      .send(updatedData) // sends a JSON post body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    const note = response.body;
    expect(note).toBeDefined();
    expect(note.title).toBe(updatedData.title);
    expect(note.content).toBe(updatedData.content);
  });

  it('should updateById partially a Note', async () => {
    const data = [
      { title: 'test', content: 'test content' },
      { title: 'test2', content: 'test content2' },
    ];
    const document = await Note.create(data);
    const updatedData = { title: 'test updated' };
    const response = await request(server)
      .patch('/notes/' + document[0]._id.toString())
      .send(updatedData) // sends a JSON post body
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    const note = response.body;
    expect(note).toBeDefined();
    expect(note.title).toBe(updatedData.title);
    expect(note.content).toBe(data[0].content);
  });
});
