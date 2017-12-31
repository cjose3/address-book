const chance = require('chance')()
const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai
chai.use(chaiHttp)

describe('Test of api routes', () => {
  let server = {}
  let request = {}

  before(async () => {
    server = await app
    request = chai.request(server)
  })

  after(() => {
    // TODO: clean database and close server
  })

  it.skip('Create user successfully', done => {
    const user = {
      email: chance.email(),
      password: chance.string({ length: 5 })
    }
    request
      .post('/users')
      .send(user)
      .then(resp => {
        expect(resp).to.have.status(201)
        expect(resp.body).to.have.all.keys('_id', 'email')
        expect(resp.body).to.not.have.any.keys('password', '__v')
        return done()
      })
      .catch(done)
  })

  it.skip('Create duplicated user', done => {
    const user = {
      email: chance.email(),
      password: chance.string({ length: 5 })
    }
    request
      .post('/users')
      .send(user)
      .then(resp => {
        expect(resp).to.have.status(201)
        return request.post('/users').send(user)
      })
      .catch(err => {
        try {
          expect(err).to.have.status(409)
          return done()
        } catch (_err) {
          return done(_err)
        }
      })
  })

  it.skip('Create user without body', done => {
    request
      .post('/users')
      .then(resp => {
        expect(resp).to.be.null
      })
      .catch(err => {
        try {
          expect(err).to.have.status(400)
          return done()
        } catch (_err) {
          return done(_err)
        }
      })
  })

  it.skip('Create user with invalid email', done => {
    const user = {
      email: chance.string(),
      password: chance.string({ length: 5 })
    }
    request
      .post('/users')
      .send(user)
      .then(resp => {
        expect(resp).to.be.null
      })
      .catch(err => {
        try {
          expect(err).to.have.status(400)
          return done()
        } catch (_err) {
          return done(_err)
        }
      })
  })

  it.skip('Create user with invalid password', done => {
    const user = {
      email: chance.email(),
      password: chance.string({ length: 3 })
    }
    request
      .post('/users')
      .send(user)
      .then(resp => {
        expect(resp).to.be.null
      })
      .catch(err => {
        try {
          expect(err).to.have.status(400)
          return done()
        } catch (_err) {
          return done(_err)
        }
      })
  })

  it.skip('Authenticate successfully', done => {
    const user = {
      email: chance.email(),
      password: chance.string({ length: 5 })
    }
    request
      .post('/users')
      .send(user)
      .then(resp => {
        expect(resp).to.have.status(201)
        return request.post('/auth').send(user)
      })
      .then(resp => {
        expect(resp).to.have.status(200)
        expect(resp.body).to.have.all.keys('accessToken', 'firebaseToken')
        return done()
      })
      .catch(done)
  })

  it.skip('Authenticate without credentials', done => {
    request
      .post('/auth')
      .then(resp => {
        expect(resp).to.be.null
      })
      .catch(err => {
        try {
          expect(err).to.have.status(401)
          return done()
        } catch (_err) {
          return done(_err)
        }
      })
  })

  it.skip('Authenticate with wrong email', done => {
    const user = {
      email: chance.email(),
      password: chance.string({ length: 5 })
    }
    request
      .post('/users')
      .send(user)
      .then(resp => {
        expect(resp).to.have.status(201)
        user.email = chance.email()
        return request.post('/auth').send(user)
      })
      .then(resp => {
        expect(resp).to.be.null
      })
      .catch(err => {
        try {
          expect(err).to.have.status(401)
          return done()
        } catch (_err) {
          return done(_err)
        }
      })
  })

  it.skip('Authenticate with wrong password', done => {
    const user = {
      email: chance.email(),
      password: chance.string({ length: 5 })
    }
    request
      .post('/users')
      .send(user)
      .then(resp => {
        expect(resp).to.have.status(201)
        user.password = chance.string()
        return request.post('/auth').send(user)
      })
      .then(resp => {
        expect(resp).to.be.null
      })
      .catch(err => {
        try {
          expect(err).to.have.status(401)
          return done()
        } catch (_err) {
          return done(_err)
        }
      })
  })

  it.skip('Create contact successfully', done => {
    const user = {
      email: chance.email(),
      password: chance.string({ length: 5 })
    }
    const contact = {
      name: chance.name(),
      phone: chance.phone()
    }
    request
      .post('/users')
      .send(user)
      .then(resp => {
        expect(resp).to.have.status(201)
        return request.post('/auth').send(user)
      })
      .then(resp => {
        expect(resp).to.have.status(200)
        return request
          .post('/contacts')
          .send(contact)
          .set('Authorization', `Bearer ${resp.body.accessToken}`)
      })
      .then(resp => {
        expect(resp).to.have.status(201)
        return done()
      })
      .catch(done)
  })

  it.skip('Create contact without accessToken', done => {
    const contact = {
      name: chance.name(),
      phone: chance.phone()
    }
    request
      .post('/contacts')
      .send(contact)
      .then(resp => {
        expect(resp).to.be.null
      })
      .catch(err => {
        try {
          expect(err).to.have.status(401)
          return done()
        } catch (_err) {
          return done(_err)
        }
      })
  })

  it('Create contact without body', done => {
    const user = {
      email: chance.email(),
      password: chance.string({ length: 5 })
    }
    request
      .post('/users')
      .send(user)
      .then(resp => {
        expect(resp).to.have.status(201)
        return request.post('/auth').send(user)
      })
      .then(resp => {
        expect(resp).to.have.status(200)
        return request
          .post('/contacts')
          .set('Authorization', `Bearer ${resp.body.accessToken}`)
      })
      .then(resp => {
        expect(resp).to.have.status(200)
        done()
      })
      .catch(done)
      // .then(resp => {
      //   expect(resp).to.have.null
      // })
      // .catch(err => {
      //   try {
      //     expect(err).to.have.status(400)
      //     return done()
      //   } catch (_err) {
      //     return done(_err)
      //   }
      // })
  })
})
