let connection = require("./connection");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {

      if (ob.hasOwnProperty(key)) {
        // if string with spaces, add quotations (cheese burger => 'cheese burger')
        arr.push(key + "=" + ob[key]);
        
        // e.g. {burger: 'cheese burger'} => ["burger='cheese burger'"]
        // e.g. {devour: true} => ["devour=true"]

      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
    selectAll: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    
    insertOne: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },

    // An example of objColVals would be {burger: cheese burger, devour: true}
    updateOne: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    // delete: function(tables, condition, cb) {
    //   var queryString = "DELETE FROM " + tables + " WHERE " + condition;
  
    //   connection.query(queryString, function(err, result) {
    //     if (err) throw err;
    //     cb(result);
    // });
    // }
};

module.exports = orm;