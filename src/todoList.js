var fs = require('fs');


function TodoList(name,filename){
  this.name = name;
  this.filename = filename + '.json';
}

TodoList.all = function(next){
  fs.readFile(getFilePathFor('todos.json'), 'utf8', function(err, data){

    console.log(data);

    next();

  })
}

TodoList.prototype.create = function (next) {
  var todoName = this.name;
  var filePath = getFilePathFor(this.filename);

  ifFileDoesNotExist(filePath, todoName, function(pathOfFile, nameOfTodo) {
    var content = {
      name: todoName
    };

    // create new file
    fs.writeFile(pathOfFile, JSON.stringify(content), function(err){
      if (err) {
        console.error(err);
      }
      console.log("New To Do List Created!");
      console.log("Find me at: ", pathOfFile);

      addToTodos(todoName);

      next();
    })
  })
};

function ifFileDoesNotExist(pathOfFile , nameOfTodo, fn) {
  fs.readFile(pathOfFile, function(err,data){
    if (err && err.code === 'ENOENT') {
      // file does not exist
      fn(pathOfFile, nameOfTodo)
    } else if (err) {
      console.error(err);
    } else {
      console.error("File already exists!");
    }
  })
}

function getFilePathFor(pathOfFile){
  var rootDir = __dirname.slice(0,__dirname.length - 3) + 'todo-lists/';
  return rootDir + pathOfFile
}

function addToTodos(nameOfTodo){
  var todos = getFilePathFor('todos.json')
  var content = {};

  fs.readFile(todos, 'utf8' ,function(err,data){
    var newData;

    if (data === '') {
      console.log("data was empty!");
      newData = {todos: [nameOfTodo]}
    } else {
      newData = JSON.parse(data);
      newData.todos.push(nameOfTodo)
    }
    fs.writeFile(todos, JSON.stringify(newData), function(err){
      if (err) {
        console.error(err);
      }
    })
  })
}

module.exports = TodoList;
