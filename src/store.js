import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const tasksReducer = (state = [], action)=> {
  if(action.type === 'SET_TASKS'){
    return action.tasks;
  }
  if(action.type === 'CREATE_TASK'){
    return [...state, action.task];
  }
  if(action.type === 'DESTROY_TASK'){
    return state.filter(task => task.id !== action.task.id); 
  }
  return state;
};

const usersReducer = (state = [], action)=> {
  if(action.type === 'SET_USERS'){
    return action.users;
  }
  return state;
};

const reducer = combineReducers({
  tasks: tasksReducer,
  users: usersReducer
});


const fetchTasks = (dispatch)=> {
  return async()=> {
    let response = await axios.get('/api/tasks');
    store.dispatch({ type: 'SET_TASKS', tasks: response.data});
  };
};

const fetchUsers = ()=> {
  return async(dispatch)=> {
    let response = await axios.get('/api/users');
    store.dispatch({ type: 'SET_USERS', users: response.data});
  };
};

const createTask = ()=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/tasks');
    dispatch({ type: 'CREATE_TASK', task: response.data });
  };
};

const destroyTask = (task)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/tasks/${task.id}`);
    dispatch({ type: 'DESTROY_TASK', task });
  };
};

/*
const reducer = (state = { users: [], tasks: []}, action)=> {
  if(action.type === 'SET_TASKS'){
    state = {...state, tasks: action.tasks};
  }
  if(action.type === 'SET_USERS'){
    state = {...state, users: action.users };
  }
  if(action.type === 'CREATE_TASK'){
    const tasks = [...state.tasks, action.task];
    state = {...state, tasks };
  }
  if(action.type === 'DESTROY_TASK'){
    const tasks = state.tasks.filter(task => task.id !== action.task.id); 
    state = {...state, tasks };
  }
  return state;
};
*/

const store = createStore(reducer, applyMiddleware(thunk));

export { fetchTasks, fetchUsers, createTask, destroyTask };
export default store;
