var prompt = require('prompt');       // npm module, how do we know?
var TodoList = require('./todoList'); // file module, how do we know?

// initializes todo list file
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

// Show the options menu
homePrompt();

// run a function in the runOption object based on what number the user enters
runOption = {

  addItem: function(){
    // show any tasks that exist

    // Get user input for task description

    // Run a method on TodoList that adds a task

    // Go back to the home prompt after
  },

  toggleItem: function(){
    // show any tasks that exist

    // Get user input for which task to toggle

    // Run a method on TodoList that toggles the task complete as true/false

    // Go back to the home prompt after
  },

  listItems: function(){
    // show any tasks that exist

    // Go back to the home prompt after
  },

  removeItem: function(){
    // show any tasks that exist

    // Get user input for task to remove

    // Run a method on TodoList that removes the item

    // Go back to the home prompt after
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
