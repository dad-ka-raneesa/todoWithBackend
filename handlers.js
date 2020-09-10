const { getNextStatus, getDefaultStatus } = require('./statuses.js');

const initiateState = (req, res) => {
  const { db } = req.app.locals;
  db.loadData().then((data) => {
    const todo = data || { title: 'Todo', list: [], lastId: 0 }
    req.app.locals.todo = todo;
    res.json(todo);
  });
};

const removeTask = (req, res) => {
  const { todo, db } = req.app.locals;
  const newList = todo.list.filter((item) => item.id !== +req.params.id);
  Object.assign(todo, { list: newList });
  db.saveData(todo).then(status => status && res.json(todo));
};

const resetTodo = (req, res) => {
  let { db } = req.app.locals;
  const todo = { title: 'Todo', list: [], lastId: 0 };
  req.app.locals.todo = todo;
  db.saveData(todo).then((status) => status && res.json(todo));
};

const updateStatus = (req, res) => {
  const { todo, db } = req.app.locals;
  const item = todo.list.find((item) => item.id === +req.params.id);
  item.status = getNextStatus(item.status);
  db.saveData(todo).then((status) => status && res.json(todo));
};

const updateTitle = (req, res) => {
  const { todo, db } = req.app.locals;
  todo.title = req.body.title;
  db.saveData(todo).then((status) => status && res.json(todo));
};

const addTask = (req, res) => {
  const { todo, db } = req.app.locals;
  const id = todo.lastId++;
  const item = { id: id, task: req.body.task, status: getDefaultStatus() };
  todo.list.push(item);
  db.saveData(todo).then((status) => status && res.json(todo));
};

module.exports = {
  initiateState,
  removeTask,
  resetTodo,
  updateStatus,
  updateTitle,
  addTask
};