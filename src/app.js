//importabamos express

const express = require("express");

const db = require("./utils/database");

const initModels = require("./models/init.models");

//users
const Users = require("./models/users.models");

//todos
const Todos = require("./models/todos.models");
//crear una instancia de express
const app = express();

const PORT = 8000;
//localhost:8000

app.use(express.json());

//probando conexion de base de datos
db.authenticate()
  .then(() => console.log("Autentificacion existosa"))
  .catch((error) => console.log(error));

initModels();
//vamos usar el metodo de nuestra db
db.sync({ alter: false })
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error)); //devuelve una promesa

app.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenido al servidor" });
});

//definir rutas de endpoints

//localhost:8000/users
//localhost:8000/todos

// GET a /users
app.get("/users", async (req, res) => {
  try {
    const result = await Users.findAll();
    res.status(200).json(result); // select * from users
  } catch (error) {
    console.log(error);
  }
});

// GET por id
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/users/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await Users.findOne({where: {username}});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//creando usuario
app.post("/users", async (req, res) => {
  try {
    const  user  = req.body;
    const result = await Users.create(user);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

//actualizar usuario
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await Users.update(field, {
      where: {id}
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

//delete usuario
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.destroy({where: {id}});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});


///////////
// todos

// GET a /todos
app.get("/todos", async (req, res) => {
  try {
    const result = await Todos.findAll();
    res.status(200).json(result); // select * from users
  } catch (error) {
    console.log(error);
  }
});

// GET por id todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todos.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});



//creando todo
app.post("/todos", async (req, res) => {
  try {
    const  todos  = req.body;
    const result = await Todos.create(todos);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

//actualizar todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await Todos.update(field, {
      where: {id}
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

//delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todos.destroy({where: {id}});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});



app.listen(PORT, () => {
  console.log(`Servidor corriendo en el ${PORT}`);
});

//relaciones entre los modelos
