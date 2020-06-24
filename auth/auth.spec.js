const server = require('../api/server');
const supertest = require('supertest');
const db = require('../data/dbConfig');

describe('POST /api/register', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })

  it.only('should register a new user with a hashed password', () => {
    return supertest(server)
      .post('/api/register')
      .send({ email: "Joe@gmail.com", name: "Joe", password: "pass"})
      .then(res => {
        expect(res.body.data.email).toBe('Joe@gmail.com');
        expect(res.body.data.password).not.toBe('pass');
        expect(res.status).toBe(201);
      })
  })
})

describe('POST /api/login', () => {
  it('should log in a user with credentials', () => {
    return supertest(server)
      .post('/api/login')
      .send({ email: "Joe@gmail.com", password: "pass"})
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.data.email).toBe("Joe@gmail.com");
      })
  })

  it('should return a JSON token upon successful login', () => {
    return supertest(server)
      .post('/api/login')
      .send({ email: "Joe@gmail.com", password: "pass"})
      .then(res => {
        expect(res.body.token).toBeTruthy();
      })
  })

  it('should not login if the user credentials are invalid' ,() => {
    return supertest(server)
      .post('/api/login')
      .send({ email: "Joe@gmail.com", password: "passs"})
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid credentials")
      })
  })

  it('should return a status 500 if missing credentials', () => {
    return supertest(server)
      .post('/api/login')
      .send({ email: "", password: "pass"})
      .then(res => {
        expect(res.status).toBe(500);
        expect(res.body.message).toBe("Email and password are required");
      })
  })
})

describe('GET /api/users/:id/issues', () => {
  let token;

  it('should get all issues created by a user', () => {
    return supertest(server)
      .post('/api/login')
      .send({ email: "Joe@gmail.com", password: "pass"})
      .then(res => {
        token = res.body.token;
        return supertest(server)
          .get('/api/users/1/issues')
          .set('Authorization', token)
          .then(res => {
            expect(res.status).toBe(200);
          })
      })
  })

  it('should return a status code error 404', () => {
    return supertest(server)
      .post('/api/login')
      .send({ email: "Joe@gmail.com", password: "pass"})
      .then(res => {
        token = res.body.token;
        return supertest(server)
          .get('/api/users/2/issues')
          .set('Authorization', token)
          .then(res => {
            expect(res.status).toBe(404);
          })
      })
  })
})
