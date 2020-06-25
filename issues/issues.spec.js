const server = require('../api/server');
const supertest = require('supertest');
const db = require('../data/dbConfig');

let token;

describe('POSTS a user', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })

  it('should add a new user', () => {
    return supertest(server)
    .post('/api/register')
    .send({ email: "Joe@gmail.com", name: "Joe", password: "pass"})
    .then(res => {
      console.log('auth-r-1');
      expect(res.body.data.email).toBe('Joe@gmail.com');
      expect(res.body.data.password).not.toBe('pass');
      expect(res.status).toBe(201);
    })
  })
})

describe('GET /issues', () => {
  console.log('issues-get-all');

  it('should get a list of all the issues', () => {
    return supertest(server)
    .post('/api/login')
    .send({ email: "Joe@gmail.com", password: "pass" })
    .then(res => {
      token = res.body.token;
      return supertest(server)
      .get('/issues')  
        .set('Authorization', token)
        .then(res => {
          console.log('issues-gall-1');
          expect(res.body.data).toBeTruthy();
        })
    })
  })
})

describe('GET /issues/:id', () => {
  console.log('issues-get-id');

  it('should get an issue by id', () => {
    return supertest(server)
    .post('/api/login')
    .send({ email: "Joe@gmail.com", password: "pass" })
    .then(res => {
      token = res.body.token;
      return supertest(server)
        .get('/issues/1')  
        .set('Authorization', token)
        .then(res => {
          console.log('issues-gid-1');
          expect(res.body[0].description).toBeTruthy();
        })
    })
  })
})

describe('GET /issues/search?city=lost+angeles', () => {
  console.log('issues-get-city');
  it('should get a list of all the issues in a city', () => {
    return supertest(server)
    .post('/api/login')
    .send({ email: "Joe@gmail.com", password: "pass" })
    .then(res => {
      token = res.body.token;
      return supertest(server)
        .get('/issues/search?city=los+angeles')  
        .set('Authorization', token)
        .then(res => {
          console.log('issues-gcity-1');
          expect(res.body.data[0].title).toBeTruthy();
          expect(res.body.data[0].city).toBe('los angeles');
        })
    })
  })
})

// POST
describe('POST /issues', () => {
  console.log('issues-post');
  it('should post an issue', () => {
    return supertest(server)
    .post('/api/login')
    .send({ email: "Joe@gmail.com", password: "pass" })
    .then(res => {
      token = res.body.token;
      return supertest(server)
        .post('/issues')
        .send({ title: "Broken Door", description: "Hit by Car", city: "los angeles" })
        .set('Authorization', token)
        .then(res => {
          console.log('issues-post-1');
          expect(res.body[0].title).toBe('Broken Door');
        })
    })
  })
})

// PUT
describe('PUT /issues/:id', () => {
  console.log('issues-put');
  it('should update an issue', () => {
    return supertest(server)
    .post('/api/login')
    .send({ email: "Joe@gmail.com", password: "pass" })
    .then(res => {
      token = res.body.token;
      return supertest(server)
        .put('/issues/1')
        .send({ title: "Broken Wall", description: "Hit by Car", city: "los angeles" })
        .set('Authorization', token)
        .then(res => {
          console.log('issues-put-1');
          expect(res.body[0].title).toBe('Broken Wall');
        })
    })
  })
})

// DELETE
describe('DELETE /issues/:id', () => {
  console.log('issues-delete');
  it('should delete an issue', () => {
    return supertest(server)
    .post('/api/login')
    .send({ email: "Joe@gmail.com", password: "pass" })
    .then(res => {
      token = res.body.token;
      return supertest(server)
        .delete('/issues/4')
        .set('Authorization', token)
        .then(res => {
          console.log('issues-d-1');
          expect(res.body.deleted).toBe("The issue was deleted")
        })
    })
  })
})