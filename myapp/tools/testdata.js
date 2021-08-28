// create mongo database
var MongoClient = require('mongodb').MongoClient;

const fs = require('fs');

var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

// DB and collection is created only if some content is inserted
const file_name = process.argv[2];
fs.readFile(file_name, (err, data) => {
  if (err) throw err;
  console.log("Data: " + data);
  const persons = JSON.parse(data);
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    //var myobj = { firstName: "Hannelore", lastName: "Benko" };
    
    dbo.collection("persons").insertMany(persons, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  }); 
});

