

const createStates = (knex, state) => {
  return knex('states').insert({
    state_name: state.state_name,
    population: state.population,
    capital: state.capital
  }, 'id')
  .then(stateId => {
    let senatorsPromises = [];

    state.senators.forEach(senator => {
      senatorsPromises.push( createSenator(knex {
        name: senator.name,
        party: senator.party,
        state_id: stateId[0]
      })
      )
    });
    return Promise.all(senatorsPromises)
  })
};

const createSenator = (knex, senator) => {
  return knex('senators').insert(senator)
};

exports.seed = function(knex, Promise) {
  return knex('senators').del()
    .then(() => knex('states').del())
    .then(() => {
      let statePromises = [];

      stateData.forEach(state => {
        statePromises.push(createStates(knex, state));
      });
      return Promise.all(statePromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
  
};
