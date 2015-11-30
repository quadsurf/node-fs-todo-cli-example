var prompt = require('prompt');
var TodoList = require('./todoList');

TodoList.init();

console.log("Welcome to Command Line Todo!");
prompt.start();

var options = {
  1: "new",
  2: "edit",
  3: "list",
  4: "delete",
}

var editOptions = {
  1: "updateDescription",
  2: "markComplete",
  3: "addTask",
  4: "changeName",
  5: "home"
}

homePrompt();

runOption = {
  new: function(){

    showList(function(){
      console.log("Enter a name for this new to-do, and a filename \n");

      prompt.get(['name', 'filename', 'description'], function (err, result) {

        TodoList.init(result.name, result.filename, result.description);

        TodoList.create(function(){
          homePrompt()
        });

      })
    });

  },

  edit: function(){
    showList(function(){

      prompt.get(['name'], function (err, result) {

      console.log("Enter the name for the to-do you want to edit \n");
        var todoName = result.name;
        TodoList.edit(todoName, function(data){
          editPrompt(data);
        })
      })

    });

  },

  list: function(){
    showList(function(){
      homePrompt();
    })
  },

  delete: function(){
    showList(function(){
      console.log("Enter the name for the to-do you want to delete \n");

      prompt.get(['name'], function (err, result) {
        var todoName = result.name;
        TodoList.delete(todoName, function(){
          homePrompt();
        })
      })
    });
  }
}

var runEditOption = {
  updateDescription: function(data){
    console.log("Enter a new description");
    prompt.get(['description'], function (err, result) {
      var content = result.description;

      TodoList.updateDetails(data,'description', content, function(info){
        editPrompt(info)
      })

    })
  },

  markComplete: function(data){
    console.log("Marked Completed!");

    TodoList.updateDetails(data,'completed', true, function(info){
      editPrompt(info)
    })

  },

  addTask: function(data){
    console.log("Enter a new task");

    prompt.get(['task'], function (err, result) {
      var content = result.task;

      TodoList.addTask(data, content, function(info){
        editPrompt(info)
      })

    })
  },

  changeName: function(data){
    console.log("Enter a new name");
    prompt.get(['name'], function (err, result) {
      var content = result.name;

      TodoList.updateDetails(data,'name', content, function(info){
        editPrompt(info)
      })

    })
  },

  home: function(data){
    homePrompt();
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

  })
}

function showEditMenu(){
  console.log("**********EDIT***************");
  console.log("OPTIONS FOR EDITING:");
  console.log("Please enter 1 - 4");
  Object.keys(editOptions).forEach(function(option){
    console.log(option, " - ", editOptions[option]);
  });
  console.log("**********EDIT***************");
}

function editPrompt(data){
  showEditMenu();

  prompt.get(['option'], function (err, result) {

    if (err) {
      console.log(err);
      return 1;
    }

    if (!editOptions.hasOwnProperty(result.option) ) {
      // not a valid option
      console.error( 'please try again with 1 - 4');
    } else {
      console.log('\n You selected:', editOptions[result.option], "\n");
      var userSelection = editOptions[result.option]
      runEditOption[userSelection](data);
    }

  })
}

function showList( next ){
  return TodoList.all(function(){
    todos = JSON.parse(TodoList.list)
    console.log("***********TODOS**************");
    for (var item in todos) {
      console.log("To-do: ", item, " Filename: ", todos[item], "\n");
    }
    console.log("***********TODOS**************");

    next()
  });
}
