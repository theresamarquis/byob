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
        response.body.length.should.equal(50);
        response.body[0].should.have.property('state_name');
        response.body[0].state_name.should.equal("Alabama");
        response.body[0].should.have.property('capital');
        response.body[0].capital.should.equal('Birmingham');
        response.body[0].should.have.property('population');
        response.body[0].population.should.equal(4874747);
        done();
      })
    })
  })


});