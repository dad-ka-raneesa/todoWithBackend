const express = require('express');
const morgan = require('morgan');
const redis = require('redis');
const { DataStore } = require('./db.js');
const {
  initiateState,
  removeTask,
  resetTodo,
  updateStatus,
  updateTitle,
  addTask
} = require('./handlers.js');
const client = redis.createClient(process.env.REDIS_URL || 6379);

const app = express();
const db = new DataStore(client);
app.locals.db = db;


app.use(morgan('dev'));
app.use(express.json());
app.use('/todo-with-react/', express.static('public'));
app.use(express.static('public'));

app.get('/api/initiateState', initiateState);
app.get('/api/removeTask/:id', removeTask);
app.get('/api/removeAll', resetTodo);
app.get('/api/updateStatus/:id', updateStatus);

app.post('/api/updateTitle', updateTitle);
app.post('/api/addTask', addTask);

module.exports = { app };