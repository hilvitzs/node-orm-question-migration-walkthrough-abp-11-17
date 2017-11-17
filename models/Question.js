'use strict';

const db = require("../config/db")

class Question{
  static CreateTable() {
    const sql = `CREATE TABLE questions(
      id INTEGER PRIMARY KEY,
      content TEXT
    )`;

    return new Promise(function(resolve) {
      db.run(sql, function() {
        console.log('questions table created');

        resolve('Success');
      })
    })
  }
}


module.exports = Question;
