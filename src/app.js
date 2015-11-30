var prompt = require('prompt');
var TodoList = require('./todoList');

prompt.start();

var options = {
  1: "new",
  2: "edit",
  3: "list",
  4: "delete",
  5: "Quit, just kidding...there is no escape...(fine, just ctrl + c)"
}

homePrompt();



runOption = {
  new: function(){
    console.log("Enter a name for this new to-do, and a filename \n");

    prompt.get(['name', 'filename'], function (err, result) {

      todoList = new TodoList(result.name, result.filename);

      todoList.create(homePrompt);

    })
  },
  edit: function(){
    console.log("Enter the name for the to-do you want to edit \n");

    prompt.get(['name'], function (err, result) {

    })
  },
  list: function(){
    return TodoList.all(homePrompt);
  },
  delete: function(){
    prompt.get(['option'], function (err, result) {

    })
  }
}

function showMenu(){
  console.log("*****************************");
  console.log("Welcome to Command Line Todo!");
  console.log("OPTIONS FOR LIST:");
  console.log("Please enter 1 - 4");
  Object.keys(options).forEach(function(option){
    console.log(option, " - ", options[option]);
  });
  console.log("***************************** \n");
}

function homePrompt(){
  showMenu();

  prompt.get(['option'], function (err, result) {
    if (err) {
      console.log(err);
      return 1;
    }

    if (!options.hasOwnProperty(result.option) ) {
      console.error( 'please try again with 1 - 4');
    } else {
      console.log('\n You selected:', options[result.option], "\n");
      var userSelection = options[result.option]
      runOption[userSelection]();
    }

  })
}
