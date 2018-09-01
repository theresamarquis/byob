process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach( done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() =>{
          done()
        })
      })
    })
  })

  describe('GET /api/v1/states', () => {
    it('should return all states', done => {
      chai.request(server)
      .get('/api/v1/states')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(4);
        response.body[0].should.have.property('state_name');
        response.body[0].state_name.should.equal("Alabama");
        response.body[0].should.have.property('capital');
        response.body[0].capital.should.equal('Birmingham');
        response.body[0].should.have.property('population');
        response.body[0].population.should.equal(4874747);
        done();
      })
    })

    it('should return a 404 for a route that does not exist', done => {
      chai.request(server)
        .get('/sad')
        .end((err, response) => {
          response.should.have.status(404);
        done()
      })
    })
  })

  describe('GET /api/v1/senators', () => {
    it('should return all senators', done => {
      chai.request(server)
      .get('/api/v1/senators')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(8);
        response.body[0].should.have.property('senator_name');
        response.body[0].senator_name.should.equal("Doug Jones");
        response.body[0].should.have.property('party');
        response.body[0].party.should.equal('D');
        response.body[0].should.have.property('state_id');
        response.body[0].state_id.should.equal(1);
        done();
      })
    })

    it('should return a 404 for a route that does not exist', done => {
      chai.request(server)
        .get('/sad')
        .end((err, response) => {
          response.should.have.status(404);
        done()
      })
    })
 })

  describe('GET /api/v1/senators/:id', () => {
  it('should return a single senator', done => {
    chai.request(server)
    .get('/api/v1/senators/1')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('senator_name');
      response.body[0].senator_name.should.equal('Doug Jones');
      response.body[0].should.have.property('party');
      response.body[0].party.should.equal('D');
      response.body[0].should.have.property('id');
      response.body[0].id.should.equal(1);
      response.body[0].should.have.property('state_id');
      response.body[0].state_id.should.equal(1);
      done()
    })
  })
  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
    done()
    })
  })
})


describe('GET /api/v1/states/:id', () => {
  it('should return a single state', done => {
    chai.request(server)
    .get('/api/v1/states/2')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('state_name');
      response.body[0].state_name.should.equal('Alaska');
      response.body[0].should.have.property('capital');
      response.body[0].capital.should.equal('Juneau');
      response.body[0].should.have.property('population');
      response.body[0].population.should.equal(739759);
      response.body[0].should.have.property('id');
      response.body[0].id.should.equal(2);
      done()
    })
  })
  
  it('should return a 404 for a route that does not exist', done => {
        chai.request(server)
        .get('/sad')
        .end((err, response) => {
            response.should.have.status(404);
          done()
          })
      })
  })


describe('PATCH /api/v1/states/:id', () => {
  it('should update a state', done => {
    chai.request(server)
    .patch('/api/v1/states/1')
    .send({
      population: 2
    })
    .end((err, response) => {
      response.should.have.status(201);
      response.should.be.json;
      response.body.should.be.a('object');
      done()
    })
  })

  it('should not update a state if there is an id field in the request', done => {
    chai.request(server)
    .patch('/api/v1/states/1')
    .send({
      id: 2
    })
    .end((err, response) => { 
      response.should.have.status(422);
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('error');
      response.body.error.should.equal('You cannot update the id field.');  
      done()
    })
  }) 

  it('should return a 404 for a route that does not exist', done => {
        chai.request(server)
        .get('/sad')
        .end((err, response) => {
            response.should.have.status(404);
          done()
          })
      }) 
})

describe('PATCH /api/v1/senators/:id', () => {
  it('should update a senator', done => {
    chai.request(server)
    .patch('/api/v1/senators/1')
    .send({
      party: "I"
    })
    .end((err, response) => {
      response.should.have.status(201);
      response.should.be.json;
      response.body.should.be.a('object');
      done()
    })
  })

  it('should not update a senator if there is an id field in the request', done => {
    chai.request(server)
    .patch('/api/v1/senators/1')
    .send({
      id: 2
    })
    .end((err, response) => { 
      response.should.have.status(422);
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('error');
      response.body.error.should.equal('You cannot update the id field.');  
      done()
    })
  })

  it('should return a 404 for a route that does not exist', done => {
        chai.request(server)
        .get('/sad')
        .end((err, response) => {
            response.should.have.status(404);
          done()
          })
    }) 
})

  describe('DELETE /api/v1/senators/:id', () => {
    it('should delete a senator', done => {
      chai.request(server)
      .delete('/api/v1/senators/1')
      .end((error, response) => {
        response.should.have.status(201);
        response.should.be.json;
        chai.request(server)
            .get('/api/v1/senators')
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
              res.body[0].should.have.property('senator_name');
              res.body[0].senator_name.should.equal("Richard Shelby");
              res.body[0].should.have.property('party');
              res.body[0].party.should.equal('R');
              done();
            });
        });
      });

    it('should return a 404 for a route that does not exist', done => {
        chai.request(server)
        .get('/sad')
        .end((err, response) => {
            response.should.have.status(404);
          done()
          })
      })
  });

  describe('DELETE /api/v1/states/:id', () => {
    it('should delete a state', done => {
      chai.request(server)
      .delete('/api/v1/senators/1')
      .end((err, response) => {
        response.should.have.status(201)
      })
      chai.request(server)
      .delete('/api/v1/senators/2')
      .end((err, response) => {
        response.should.have.status(201)
      })
      chai.request(server)
      .delete('/api/v1/states/1')
      .end((error, response) => {
        response.should.have.status(201);
        response.should.be.json;
        chai.request(server)
            .get('/api/v1/states')
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
              res.body[0].should.have.property('state_name');
              res.body[0].state_name.should.equal("Alaska");
              res.body[0].should.have.property('population');
              res.body[0].population.should.equal(739759);
              res.body[0].should.have.property('capital');
              res.body[0].capital.should.equal('Juneau');
              done();
            });
        });
      });

    it('should return a 404 for a route that does not exist', done => {
        chai.request(server)
        .get('/sad')
        .end((err, response) => {
            response.should.have.status(404);
          done()
          })
      })
  });


})