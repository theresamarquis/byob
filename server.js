const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000)
app.locals.title = 'byob'

app.get('/api/v1/senators', (request, response) => {
  database('senators').select()
    .then((senators)=>{
      response.status(200).json(senators)
    })
    .catch((err)=>{
      response.status(500).json({err})
    })
})

app.get('/api/v1/states', (request, response)=>{
  database('states').select()
  .then((states)=>{
    response.status(200).json(states)
  })
  .catch((err)=>{
    response.status(500).json({err})
  })
})












app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;