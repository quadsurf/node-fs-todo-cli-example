# Node File IO Example: Creating A To Do List

In this example, we're creating a to-do list app that will work in the command line.  We want to be able to create new to-do lists each with tasks, and be able to add new tasks and mark existing tasks as complete.  We also want the ability to delete any tasks.

Each todo list will be file that our app will create, such as `mondayTodos.json`.

In each file, there will be a list of tasks that we can read, update, mark as complete, or delete.

There two types of examples, the one on the master branch is more complex.

**A simpler example exist on a different branch.**

## Exercise Objectives

- Build a to-do list app that creates new files in `.json` format
- Each file is its own to-do list
- Inside each to do list are tasks added from our app.
- We should be able to read each to-do list file and add, update, or delete tasks within.

## Educational Objectives

This example is created to orient you on how the Node File System (FS) Module comes together to do something purposeful.  The example uses FS to read files (readFile) and write to files (writeFile) to solve problems you will most likely encounter in the wild.  

Key topics in this example include:

- Running Node scripts in terminal
- Using a Node Module
- Reading, writing to, and creating files with Node FS Module
- Understanding the async reading
- Parsing files
- Code structure and organization
- Callbacks
