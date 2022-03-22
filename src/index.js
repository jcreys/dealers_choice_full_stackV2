import React from 'react';
import ReactDOM from 'react-dom';
import Tasks from './Tasks';
import Header from './Header'
import Users from './Users';
import store, { fetchTasks, fetchUsers } from './store';
import { Provider } from 'react-redux';

class App extends React.Component{
  async componentDidMount(){
    await store.dispatch(fetchTasks());
    await store.dispatch(fetchUsers());
    console.log('all data is loaded');
  }
  render(){
    return (
      <div>
        <Header />
        <Users />
        <Tasks />
      </div>
    );
  }
}
const root = document.querySelector('#root');
ReactDOM.render(<Provider store={ store }><App /></Provider>, root);
