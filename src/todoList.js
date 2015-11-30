var fs = require('fs');


var TodoList = {

  init: function(name, filename, description){

    // if they are all blank, just set the todosFile propery
    if (name || filename || description) {
      this.name = name;
      this.filename = filename + '.json';
      this.description = description;
    }

    this.todosFile = getFilePathFor('todos.json')
  },

  all: function(next){
    fs.readFile(TodoList.todosFile, 'utf8', function(err, data){

      TodoList.list = data;


      if (next) {
        next();
      }

    })
  },

  create: function (next) {
    var todoName = this.name;
    var filename = this.filename;
    var description = this.description;

    ifFileDoesNotExist(filename, todoName, function(pathOfFile, nameOfTodo) {
      var content = {
        name: todoName,
        filename: filename,
        description: description,
        completed: false,
        tasks: []
      };

      var newContent = JSON.stringify(content)

      // create new file
      fs.writeFile(pathOfFile, newContent , function(err){
        if (err) {
          console.error(err);
        }
        console.log("\n >>>>>>> New To Do List Created! <<<<<<< \n ");
        console.log("\n Find me at: ", pathOfFile, "\n");

        addToTodos(filename, todoName);

        if (next) {
          next();
        }
      })
    })
  },

  edit: function( nameOfTodo, next){

    this.all(function(){

      list = JSON.parse(TodoList.list)

      if (todoNameIsNotInList(list, nameOfTodo)) {
        console.error('That to-do name could not be found');
      } else {
        todo = getFilePathFor(list[nameOfTodo])
        fs.readFile(todo,'utf8', function(err,data){
          console.log(data);

          if (next) {
            next(data);
          }

        })
      }

    })
  },

  delete: function(nameOfTodo, next) {

    fs.readFile(TodoList.todosFile, 'utf8', function(err, data){
      todos = JSON.parse(data);

      console.log("\n Deleting ", nameOfTodo );

      // delete file itself
      todoFile =  getFilePathFor(todos[nameOfTodo])

      fs.unlink(todoFile, function (err) {
          if (err) {
            console.error(err);
          }
        console.log('successfully deleted todo');
      });

      // Delete from todos.json
      delete todos[nameOfTodo]

      todos = JSON.stringify(todos);

      fs.writeFile(TodoList.todosFile, todos, function(err){
        if (err) {
          console.error(err);
        }
      })

      // go to next prompt
      next()

    })

  },

  updateDetails: function(todoData, detail, contentToUpdate, next) {
    var todo = JSON.parse(todoData);
    var filepath = getFilePathFor(todo.filename);

    fs.readFile(filepath,'utf8', function(err,data){

      if (err) {
        console.error(err);
      }

      // Parse the todo list, update, turn back to string
      var content = JSON.parse(data);
      content[detail] = contentToUpdate;
      newContent = JSON.stringify(content);

      fs.writeFile(filepath, newContent,function(err){
        if (err) {
          console.error(err);
        }
        console.log("\n >>>>>>> Content Updated! <<<<<<< \n ");
        next(todoData);
      })
    })
  },

  addTask: function(todoData, taskContent, next) {
    var todo = JSON.parse(todoData);
    var filepath = getFilePathFor(todo.filename);

    var newTask = {
      description: taskContent,
      completed: false
    }

    fs.readFile(filepath,'utf8', function(err,data) {

      if (err) {
        console.error(err);
      }

      // Parse the todo list, update, turn back to string
      var content = JSON.parse(data);
      content.tasks.push(newTask);
      newContent = JSON.stringify(content);

      fs.writeFile(filepath, newContent,function(err){
        if (err) {
          console.error(err);
        }
        console.log("\n >>>>>>> New Task Added! <<<<<<< \n ");
        next(todoData);
      })
    })
  }

}

function ifFileDoesNotExist(filename, nameOfTodo, fn) {
  var filePath = TodoList.todosFile;

  fs.readFile(filePath, 'utf8',function(err,data) {

    if (err) {
      console.error(err);
    }

    if (data === '') {
      var todos = {};
    } else{
      var todos = JSON.parse(data);
    }

    var duplicateFilename = false;
    var duplicateTodoName = !todoNameIsNotInList(todos, nameOfTodo);

    Object.keys(todos).forEach(function(name){
      if (todos[name] === filename ) {
        duplicateFilename = true;
      }
    })

    if (duplicateFilename || duplicateTodoName) {

      console.error('Duplication Found!');
      console.error('Duplicate filename:', duplicateFilename );
      console.error('Duplicate to-do name:', duplicateTodoName );

    } else {

      var pathOfFile = getFilePathFor(filename)
      fn(pathOfFile, nameOfTodo)

    }

  })
}

function getFilePathFor(pathOfFile){
  var rootDir = __dirname.slice(0,__dirname.length - 3) + 'todo-lists/';
  return rootDir + pathOfFile
}

function addToTodos(nameOfFile, nameOfTodo){
  var todos = TodoList.todosFile

  fs.readFile(todos, 'utf8' ,function(err,data){
    var newData;

    if (data === '') {
      console.log("data was empty!");
      newData = {};
      newData[nameOfTodo] = nameOfFile
    } else {
      newData = JSON.parse(data);
      newData[nameOfTodo] = nameOfFile;
    }

    var newTodosList = JSON.stringify(newData)

    fs.writeFile(todos, newTodosList, function(err){
      if (err) {
        console.error(err);
      }
    })

  })
}

function todoNameIsNotInList(listToCheck, nameToCheck){
  if (listToCheck.hasOwnProperty(nameToCheck)) {
    return false;
  } else {
    return true;
  }
}

module.exports = TodoList;
