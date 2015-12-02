# Node File IO Example: Creating A To Do List

In this example, we're creating a to-do list app that will work in the command line. In the basic version we only want to maintain one todo list. We must be able to:

1. Add new tasks to the list
2. Delete tasks from the list
3. Mark existing tasks as complete
4. Unmark a task as complete

A solution can be found on the branch `basic-example`.

The `master` branch, has a more complex example where we can maintain several todo lists.

## Exercise Objectives, Simple Version

- Build a to-do list app that modifies an existing `.json` file
- Inside the todo list are tasks added from our app.
- We should be able to read the todo list file and add, update, or delete tasks within.

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


## Getting started

- Clone to your local machine
- In your local app folder, type `sudo npm install`
- See what you have so far by running `node src/app.js`
- Write your code in the files inside the src folder
