var fs = require('fs');


var TodoList = {

  init: function(){

    // creates a full filepath for a given string
    this.todoFilePath = createFilePathFor("myTodo.json")

    // see if myTodo.json tasks are empty
    tasksStatus(this.todoFilePath, function(status, filepath){
      if (status === 'empty') {
        fs.writeFile(filepath, '{"name": "myTodo" ,"tasks":[]}', function(err){
          if(err) console.log(err);
        })
      }
    })

  },

  list: function(callback){
    // read myTodo.json
    fs.readFile(TodoList.todoFilePath, 'utf8', function(err,data){
      var tasks = JSON.parse(data).tasks;
      var todo = JSON.parse(data);
      callback(tasks, todo);
    })
  },

  addItem: function(itemDesc, callback){

    fs.readFile(TodoList.todoFilePath, 'utf8', function(err,data){

      // save what we already have in myTodo.json
      var currentData = JSON.parse(data);

      // add the new task
      currentData.tasks.push({description: itemDesc, completed: false})
      var newData = JSON.stringify(currentData);

      // update myTodo.json with the changed tasks list
      fs.writeFile(TodoList.todoFilePath, newData, function(err){
        if(err) console.error(err);

        console.log("wrote ", newData, " to ", TodoList.todoFilePath );

        if(callback) callback();
      })

    })

  },

  toggleItem: function(itemNumber, callback){
    TodoList.list(function(tasks, todo){

      if (tasks[itemNumber] !== undefined) {
        console.log('Updating task');
        // get the completed status
        var completedStatus = tasks[itemNumber].completed

        // toggle it, by making it equal to the opposite
        tasks[itemNumber].completed = !completedStatus

      } else {
        console.log('Task number was not valid');
      }

      // update todo list
      todo.tasks = tasks;
      var updatedTodo = JSON.stringify(todo);

      // update myTodo.json with the changed tasks list
      fs.writeFile(TodoList.todoFilePath, updatedTodo, function(err){
        if(err) console.error(err);

        if(callback) callback();
      })

    })
  },

  removeItem: function(itemNumber, callback){
    TodoList.list(function(tasks, todo){

      // remove task from todo if that task number is valid
      if (todo.tasks[itemNumber] !== undefined) {
        console.log('Removing task');
        todo.tasks.splice(itemNumber,1);
      } else {
        console.log('Task number was not valid');
      }

      var updatedTodo = JSON.stringify(todo);

      // update myTodo.json with the changed tasks list
      fs.writeFile(TodoList.todoFilePath, updatedTodo, function(err){
        if(err) console.error(err);

        if(callback) callback();
      })

    })
  }
}

function createFilePathFor(filename){
  var rootDir = __dirname.slice(0,__dirname.length - 3) + 'todo-lists/';
  return rootDir + filename
}

function tasksStatus(tasksFile, callback){
  fs.readFile(tasksFile, 'utf8', function(err,data){
    if(err) console.error(err);

    var tasksData = null;
    var status = null;
    var tasks = null;

    if (data === '') {
      status = 'empty';
    } else {
      tasks = JSON.parse(data).tasks
    }

    if(tasks === null) {
      status = 'empty';
    } else {
      status = 'notEmpty'
    }

    callback(status, tasksFile);

  })
}


module.exports = TodoList;
