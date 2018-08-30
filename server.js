const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set('port', process.env.PORT || 3000)
app.locals.title = 'byob'

app.get('/api/v1/senators', (request, response) => {
  database('senators').select()
    .then((senators) => {
      response.status(200).json(senators)
    })
    .catch((err) => {
      response.status(500).json({ err })
    })
})

app.get('/api/v1/states', (request, response) => {
  database('states').select()
    .then((states) => {
      response.status(200).json(states)
    })
    .catch((err) => {
      response.status(500).json({ err })
    })
})

app.get('/api/v1/senators/:id', (request, response) => {
  database('senators').where('id', request.params.id).select()
    .then(senators => {
      if (senators.length) {
        response.status(200).json(senators)
      } else {
        response.status(404).json({ error: `Could not find senator with id ${request.params.id}` })
      }
    })
    .catch(err => {
      response.status(500).json({ err })
    })
})

app.get('/api/v1/states/:id', (request, response) => {
  database('states').where('id', request.params.id).select()
    .then(states => {
      if (states.length) {
        response.status(200).json(states)
      } else {
        response.status(404).json({ error: `Could not find state with id ${request.params.id}` })
      }
    })
    .catch(err => {
      response.status(500).json({ err })
    })
})

app.post('/api/v1/states', (request, response) => {
  const state = request.body;
  
  for (let requiredParameter of ['state_name', 'capital', 'population']) {
    if (!state[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: {state_name: <STRING> capital: <STRING>, population: <NUMBER>}. You are missing a '${requiredParameter}' property.`
      });
    }
  }
  database('states').insert(state, 'id')
    .then(state =>{
      response.status(201).json({id: state[0]})
    })
    .catch(err=>{
      response.status(500).json({err})
    })
})

app.post('/api/v1/senators', (request, response)=>{
  const senator = request.body;
  for (let requiredParameter of ['senator_name', 'party', 'state_id']) {
    if (!senator[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: {senator_name: <STRING>, party: <STRING>, state_id: <NUMBER>}. You are missing a '${requiredParameter}' property.`
      });
    }
  }
  database('senators').insert(senator, 'id')
  .then(senator=>{
    response.status(201).json({id: senator[0]})
  })
  .catch(err=>{
    response.status(500).json({err})
  })
})












app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;