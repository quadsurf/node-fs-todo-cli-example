var fs = require('fs'); // builtin module, how do we know?


/* This is a class, even if it's not using a constructor function. Instead 
   We are using the init function as a constructor. 
*/
var TodoList = {

  /**
   * This function reads our todo list file, and if it's empty it initializes 
   * such a file. 
   */
  init: function(){

    // creates a full filepath for a given string
    this.todoFilePath = createFilePathFor("myTodo.json")

    // see if myTodo.json tasks are empty
    tasksStatus(this.todoFilePath, function(status, filepath){
      if (status === 'empty') {
        var emptyListString = '{"name": "myTodo" ,"tasks":[]}';

        // Write the empty list to the file, and print any errors
        fs.writeFile(filepath, emptyListString, function(err){
          if(err) console.log(err);
        });
      }
    });

  },

  /**
   * This function prints the current todo list, then performs a callback
   * function using the array of tasks, and the whole todo object
   * as parameters.
   */
  list: function(callback){
    // read myTodo.json
    fs.readFile(TodoList.todoFilePath, 'utf8', function(err,data){
      var tasks = JSON.parse(data).tasks;
      var todo = JSON.parse(data);

      // the user IS required to provide a callback
      callback(tasks, todo);
    })
  },

  /**
   * Adds an unfinished task, with a description of itemDesc to the todo list.
   * Then execute a callback if provided. 
   */
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

        // The caller is not required to provide a callback
        if(callback) callback();
      })

    })

  },

  /**
   * Given an itemNumber, toggle that item finished or unfinished, then execute
   * a callback if provided.
   */ 
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
      });

    });
  },

  /**
   * Given an itemNumber, delete that item from the list, then call a provided
   * callback function. 
   */
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
      });

    });
  }
}

// These two functions are NOT member functions of the todo list.

/**
 * given a filename, create a new file with that name inside the todo-lists
 * directory.
 */
function createFilePathFor(filename){
  var rootDir = __dirname.slice(0,__dirname.length - 3) + 'todo-lists/';
  return rootDir + filename
}

/**
 * Given a filepath, determine if it is empty. Then call the callback
 * with the empty/non-empty status and the tasks themselves (if non-empty)
 */
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

  });
}


module.exports = TodoList;
