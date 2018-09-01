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


});