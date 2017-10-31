var db = require("../db")

class IceBreakerResponse {
  constructor(icebreakerID, questionID, email, secret) {
    this.icebreakerID = icebreakerID;
    this.questionID = questionID;
    this.email = email;
    this.secret = secret;
  }

  insert(){
    db.run(`INSERT INTO icebreaker_responses (icebreakerID, questionID, email, secret) 
      VALUES (?,?,?,?)`, this.icebreakerID, this.questionID, this.email, this.secret)
  }
}

IceBreakerResponse.createTable = function(){
  let sql = `
    CREATE TABLE IF NOT EXISTS icebreaker_responses (
      id INTEGER PRIMARY KEY, 
      icebreakerID INTEGER,
      questionID INTEGER,
      email TEXT,
      secret TEXT,
      response_text TEXT,
      response_url TEXT
    )
  `

  db.run(sql)
}

IceBreakerResponse.findAllByIceBreakerID = function(icebreakerID){
  let query = new Promise(function(resolve, reject){
    let sql = `SELECT * FROM icebreaker_responses WHERE icebreakerID = ?`;
    let results = [];

    db.all(sql, icebreakerID, function(err, rows){
      rows.forEach(function(row){
        let response = new IceBreakerResponse(row.icebreakerID, row.questionID, row.email, row.secret);
        response.id = row.id;
        results.push(response)
      })

      resolve(results)
    })        
  })

  return query;
}

module.exports = IceBreakerResponse