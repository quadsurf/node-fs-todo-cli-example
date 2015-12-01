var prompt = require('prompt');       // npm module, how do we know?
var TodoList = require('./todoList'); // file module, how do we know?

TodoList.init()

console.log("Welcome to Command Line Todo!");
prompt.start();

// These are the things we can do
var options = {
  1: "addItem",
  2: "toggleItem",
  3: "listItems",
  4: "removeItem",
}

homePrompt();

runOption = {

  addItem: function(){
    TodoList.list(function(tasks){
      showTasks(tasks)

      console.log(">>>>>>>>>>>>>ADD ITEM>>>>>>>>>>>>>>>>>>");
      console.log("Enter a description for the new item you would like to add: \n");

      prompt.get(['description'], function (err, result) {

        TodoList.addItem(result.description, function(){
          homePrompt();
        });

      });
    });
  },

  toggleItem: function(){
    TodoList.list(function(tasks){
      showTasks(tasks)

      console.log(">>>>>>>>>>>>>TOGGLE ITEM>>>>>>>>>>>>>>>>>>");
      console.log("Enter the task number for the task you would like to toggle \n");

      prompt.get(['taskNumber'], function (err, result) {

        TodoList.toggleItem(result.taskNumber, function(){
          homePrompt();
        });

      });
    });
  },

  listItems: function(){
    TodoList.list(function(tasks){
      showTasks(tasks)
      homePrompt();
    })
  },

  removeItem: function(){
    TodoList.list(function(tasks){
      showTasks(tasks)

      console.log(">>>>>>>>>>>>>REMOVE ITEM>>>>>>>>>>>>>>>>>>");
      console.log("Enter the task number for the task you would like to remove \n");

      prompt.get(['taskNumber'], function (err, result) {

        TodoList.removeItem(result.taskNumber, function(){
          homePrompt();
        });

      });
    });
  }
}

function showMenu(){
  console.log("***********HOME**************");
  console.log("OPTIONS FOR LIST:");
  console.log("Please enter 1 - 4");
  Object.keys(options).forEach(function(option){
    console.log(option, " - ", options[option]);
  });
  console.log("***********HOME**************");
}

/**
 * This function is commonly used as a callback. We do this so that we can
 * show the home screen prompt after an asyc callback (which is how we must
 * fetch data using the fs module).
 */
function homePrompt(){
  showMenu();

  prompt.get(['option'], function (err, result) {

    if (err) {
      console.log(err);
      return 1;
    }

    if (!options.hasOwnProperty(result.option) ) {
      // not a valid option
      console.error( 'please try again with 1 - 4');
    } else {
      console.log('\n You selected:', options[result.option], "\n");
      var userSelection = options[result.option]
      runOption[userSelection]();
    }

  });
}

/**
 * This function takes a list of tasks and displays them nicely in the CLI.
 */
function showTasks(tasksToShow){
  console.log("________LIST ITEMS___________ \n");
  if (tasksToShow.length === 0) {
    console.log("NONE");
  } else {
    for (var i = 0; i < tasksToShow.length; i++) {
      // start numbering from 1
      console.log(i + ':', tasksToShow[i].description, '| completed: ' + tasksToShow[i].completed + "\n");
    }
  }
}
