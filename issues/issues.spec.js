const server = require('../api/server');
const supertest = require('supertest');

let token;

describe('GET /issues', () => {
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
          expect(res.body.data).toBeTruthy();
        })
    })
  })
})

describe('GET /issues/:id', () => {
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
          expect(res.body).toHaveLength(1);
        })
    })
  })
})

describe('GET /issues/search?city=lost+angeles', () => {
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
          expect(res.body.data).toHaveLength(1);
        })
    })
  })
})

describe('POST /issues', () => {
  it('should post an issue', () => {
    return supertest(server)
    .post('/api/login')
    .send({ email: "Joe@gmail.com", password: "pass" })
    .then(res => {
      token = res.body.token;
      return supertest(server)
        .post('/issues')
        .send({ title: "Broken Door", description: "Hit by Car", city: "santa barbara" })
        .set('Authorization', token)
        .then(res => {
          expect(res.body).toHaveLength(1);
        })
    })
  })
})

describe('PUT /issues/:id', () => {
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
          expect(res.body).toHaveLength(1);
        })
    })
  })
})

describe('DELETE /issues/:id', () => {
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
          expect(res.body.deleted).toBe("The issue was deleted")
        })
    })
  })
})