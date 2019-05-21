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
    const [node, path, name] = process.argv;
    return name
}
const name = getArguments();
knex.from('famous_people')


  .where({
    first_name: name
  })
  .orWhere({
    last_name: name
  })
  .select("*")
  .then((rows) => {
    console.log(name)
      for (row of rows) {
        //   console.log(`- ${row['id']}: ${row['first_name']} ${row['last_name']}, born ${row['birthdate']}`);
        displayPerson(row)
      }
  })
  .catch((err) => { console.log( err); throw err })
  .finally(() => {
      knex.destroy();
  });