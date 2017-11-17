'use strict';

const db = require("../config/db")

class Question{
  static CreateTable() {
    const sql = 'CREATE TABLE questions;'
  }
}


module.exports = Question;
