const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const path        = require("path");

const Todo = require("./models/todo");
const todoRoutes = require('./routes/todos');
const app = express();

mongoose.connect('mongodb://localhost:27017/todos2020', {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.put('/api/todos/:id', (req, res, next) => {
  const todo = {
    title: req.body.title,
  };

  Todo.updateOne({ _id : req.params.id}, todo)
  .then(createdTodo => {
    res.status(201).json({
      id: req.params.id,
      title: req.body.title
    });
  });
});


app.post('/api/todos', (req, res, next) => {
  const todo = new Todo({
    title: req.body.title
  });
  todo.save().then(createdTodo => {
    res.status(201).json({
      id: createdTodo.id,
      title: createdTodo.title
    });
  });
});

app.get('/api/todos', (req, res, next) => {
  Todo.find()
    .then(todos => {

      let returnedTodos = [];
    
      for (let i = 0; i < todos.length; i++) {
        returnedTodos.push(todos[i].transform());
      }

      res.status(200).json(
        returnedTodos
      );
    });
});

// FIND a Book
app.get('/api/todos/:id', (req, res, next) => {
  Todo.findById(req.params.id)
  .then(todo => {
      if(!todo) {
          return res.status(404).send({
              message: "Book not found with id " + req.params.id
          });            
      }
      console.log(todo);
      res.send(todo.transform());
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Book not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Book with id " + req.params.id
      });
  });
});

app.delete('/api/todos/:id', (req, res, next) => {
  Todo.deleteOne({_id: req.params.id})
    .then( result => {
      res.status(200).json({
        message: "Todo deleted"
      });
    });
});

// app.use("/api/trackings", trackingsRoutes);

module.exports = app;
