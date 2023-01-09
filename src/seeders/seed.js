const db = require("../utils/database");
const Users = require("../models/users.models");
const Todos = require("../models/todos.models");

const users = [
  {username: "carlos", email: "carlos@gmail.com", password: "1234"},
  {username: "jordy", email: "jordy@gmail.com", password: "1234"},
  {username: "juan", email: "juan@gmail.com", password: "1234"},
  {username: "diego", email: "diego@gmail.com", password: "1234"},
];

const todos = [
  {title: "Tarea 1" , description: "Descripcion para 1", userId:1,},
  {title: "Tarea 2" , description: "Descripcion para 2", userId:1,},
  {title: "Tarea imposible" , description: "tarea 2", userId:2,},
  {title: "Dormir" , description: "shañaa", userId:3,},
];

//const categories = [];

//const todosCategories = [];

db.sync({force: true})
.then(() => {
  console.log("Iniciando con la semilla");
  users.forEach((user) => Users.create(user)); 
  setTimeout(() => {
    todos.forEach((todo) => Todos.create(todo)) 
  }, 100)
})
.catch((error) => console.log(error));