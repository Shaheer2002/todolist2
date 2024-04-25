#! /usr/bin/env node
import inquirer from "inquirer";
let todos: string[] = [];
let condition = true;

console.log("Welcome to Todo list!");

async function main() {
  while (condition) {
    let addtask = await inquirer.prompt([
      {
        name: "todo",
        type: "input",
        message: "What do you want to add in your Todos?",
      },
      {
        name: "addMore",
        type: "confirm",
        message: "Do you want to add more in your todos?",
        default: "true",
      },
      // {
      //   name: "delete",
      //   type: "confirm",
      //   message: "Do you want to delete a task?",
      //   default: "false",
      // },
    ]);
    todos.push(addtask.todo);
    condition = addtask.addMore; //update condition if false
    console.log("Your current todo list: " + todos);
  
    // if (addtask.delete) {
    //   todos.pop();
    //   console.log("New list after deletion: " + todos);
    // }
  }
  
  console.log("Your final todo list: ");
  //display todo output line by line
  let num = 1;
  for (let i = 0; i < todos.length; i++) {
    console.log(num + ". " + todos[i]);
    num++;
  }
  
  //Update the element in todo list if the user requires
  let updateElement = await inquirer.prompt([
    {
      name: "question",
      type: "confirm",
      message: "Do you want to update a task?",
      default: "false",
    },
    {
      name: "delete",
      type: "confirm",
      message: "Do you want to delete a task?",
      default: "false",
    },
  ]);
  if (updateElement.delete) {
    let deleteTask = await inquirer.prompt([
      {
        name: "taskdelete",
        type: "input",
        message: "Which task do you want to delete?",
      },
    ]);
    let index = todos.indexOf(deleteTask.taskdelete);
    todos.splice(index, 1); //delete the element at index position
    console.log("New list after deletion: " + todos);
  }
  
  if (updateElement.question) {
    let updateTask = await inquirer.prompt([
      {
        name: "update",
        type: "input",
        message: "Which task do you want to update?",
      },
    ]);
    //Grabs index of the element to be updated
    let index = todos.indexOf(updateTask.update);
    let newTask = await inquirer.prompt([
      {
        name: "update2",
        type: "input",
        message: "Enter the new task: ",
      },
    ]);
    todos[index] = newTask.update2; //Assign the new task value to todos[index]
    console.log("Updated todo list: " + todos);
  }
  
}

main();
