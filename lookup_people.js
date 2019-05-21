//connect to database test_db
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
})
//take arguments in the command and store them

const getArguments = () => {
    const [node, path, name] = process.argv;
    return name
}

//function display id, firstname, lastname, and birthdate
//- 1: Paul Rudd, born '1969-04-06'
const displayPerson = outputObj => {
    console.log(`- ${outputObj.id}: ${outputObj.first_name} ${outputObj.last_name}, born ${outputObj.birthdate}`)
}

//function that loops through entire result array with objects
//and give me the person object if the first_name = input firstName

const renderPerson = (objectArray) => {
    for (const singleObject of objectArray) {
            displayPerson(singleObject);
    }
}
//selectPeople function
const selectPeople = (input) => {
    //Select Query
  const query = {
    text: `SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1`,
    values: [input]
  };

  // Run query
  client
    .query(query)
    // Getting the result
    .then(res => renderPerson(res.rows))

    // Catching errors
    .catch(err => console.log(err))
    .finally(() => {
        client.end()
    });
};
//get arguments from command line using getArguments function
const name = getArguments()
//call the select query function
selectPeople(name);

