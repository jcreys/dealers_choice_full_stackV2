const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_full_stack');

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  }
});

const Task = sequelize.define('task', {
  name: {
    type: Sequelize.STRING
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Task.generateRandom = function(){
  return this.create({ name: `Task Number ${ Math.floor(Math.random()*5000)}`});
};

const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.delete('/api/tasks/:id', async(req, res, next)=>{
  try {
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/tasks', async(req, res, next)=>{
  try {
    const task = await Task.generateRandom();
    res.send(task);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/tasks/:id', async(req, res, next)=>{
  try {
    const task = await Task.findByPk(req.params.id);
    await task.update({ complete: req.body.complete});
    res.send(task);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/tasks', async(req, res, next)=>{
  try {
    //create a delay to see loader
    setTimeout(async()=> {
      res.send( await Task.findAll());
    }, 250);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users', async(req, res, next)=>{
  try {
    //create a delay to see loader
    setTimeout(async()=> {
      res.send( await User.findAll());
    }, 250);
  }
  catch(ex){
    next(ex);
  }
});


const init = async()=> {
  try {
    await sequelize.sync({ force: true });
    await Promise.all([
      Task.generateRandom(),
      Task.generateRandom(),
      Task.generateRandom(),
      User.create({ name: 'moe'}),
      User.create({ name: 'lucy'}),
      User.create({ name: 'ethyl'}),
      User.create({ name: 'fred'})
    ]);

    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();
