//connect using knex
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'development',
      password : 'development',
      database : 'test_db'
    }
  });

//display function
const displayPerson = outputObj => {
    console.log(`- ${outputObj.id}: ${outputObj.first_name} ${outputObj.last_name}, born ${outputObj.birthdate}`)
}  
//get arguments function
const getArguments = () => {
    const [node, path, firstName, lastName, date ] = process.argv;
    return {firstName, lastName, date}
}
const firstname = getArguments().firstName;
const lastname = getArguments().lastName;
const date = getArguments().date;

// .returning('id')
// .into('person')
// .then(function (id) {
//   // use id here
// });



knex('famous_people')
  .insert({first_name: firstname, last_name: lastname, birthdate: date})
  .returning('id')
  .into('famous_people')
  .then(function(id) {
      console.log(`Item ${id} is  added  to the table famous_people`)
        // console.log(`- ${row['id']}: ${row['first_name']} ${row['last_name']}, born ${row['birthdate']}`);
      })
  .catch((err) => { console.log( err); throw err })
  .finally(() => {
      knex.destroy();
  });


