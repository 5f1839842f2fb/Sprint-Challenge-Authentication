const request = require('supertest')
const db = require('../database/dbConfig')
const server = require('./server')

beforeAll(async () => {
  await db('users').truncate()
})

describe('index.js', () => {

  describe('/api/auth', () => {

    it('missing username or password failure', async () => {
      const response = await request(server).post('/api/auth/register')
      .send({ username: "test1" })
      expect(response.text).toBe("Missing username or password")
    })

    describe('/register', () => {

      it('success', async () => {
        const response = await request(server).post('/api/auth/register')
        .send({ username: "test1", password: "test1" })
        expect(response.text).toBe("Success!")
      })
  
      it('non-unique username failure', async () => {
        const response = await request(server).post('/api/auth/register')
        .send({ username: "test1", password: "test2" })
        expect(response.text).toBe("Error")
      })
    })
  
    describe('/login', () => {
  
      it('success', async () => {
        const response = await request(server).post('/api/auth/login')
        .send({ username: "test1", password: "test1" })
        expect(response.text).toBe("Logged in!")
      })
  
      it('wrong password failure', async () => {
        const response = await request(server).post('/api/auth/login')
        .send({ username: "test1", password: "test2" })
        expect(response.text).toBe("Invalid credentials")
      })
  
      it('no account failure', async () => {
        const response = await request(server).post('/api/auth/login')
        .send({ username: "asdasdasd3", password: "test2" })
        expect(response.text).toBe("Account doesn't exist")
      })
    })

    /* describe('/logout', () => { // wont work without major stretch to get sessions to somehow work with supertest
  
      it('success', async () => {
        const response = await request(server).get('/api/auth/logout')
        expect(response.text).toBe("Logged out!")
      })
  
      it('not logged in failure', async () => {
        const response = await request(server).get('/api/auth/logout')
        expect(response.text).toBe("Not logged in")
      })
    }) */
  })

  /* describe('/api/jokes', () => { // same as above
    it('success', async () => {
      const response = await request(server).get('/api/jokes')
      expect(response.status).toBe(200)
    })
  }) */
})