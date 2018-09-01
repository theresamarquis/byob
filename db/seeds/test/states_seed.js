

exports.seed = function (knex, Promise) {
  return knex('senators').del()
    .then(() => knex('states').del())
    .then(() => {
      return Promise.all([
        knex('states').insert([
        {
          state_name: 'Alabama',
          population: 4874747,
          capital: "Birmingham"
        }, 
        {
          state_name: "Alaska",
          population: 739759,
          capital: "Juneau"
        },
        {
          state_name: "Arizona",
          population: 7016270,
          capital: "Phoenix"
        },
        {
          state_name: "Arkansas",
          population: 3004279,
          capital: "Little Rock"
        }],'id')
        .then(state => {
          return knex ('senators').insert([
            {senator_name: "Doug Jones", party: "D", state_id: state[0]}, 
            {senator_name: "Richard Shelby", party: "R", state_id: state[0]},
            {senator_name: "Lisa Murkowski", party: "R", state_id: state[1]},
            {senator_name: "Daniel Sullivan", party: "R", state_id: state[1]},
            {senator_name: "John McCain", party: "R", state_id: state[2]},
            {senator_name: "Jeff Flake", party: "R", state_id: state[2]},
            {senator_name: "John Boozman", party: "R", state_id: state[3]},
            {senator_name: "Tom Cotton", party: "R", state_id: state[3]}
            ])
        })
        ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));

};