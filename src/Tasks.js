import React from 'react';
import { connect } from 'react-redux';
import { destroyTask } from './store';

const Tasks = ({ tasks, destroy })=> { 
  return (
    <ul>
      {
        tasks.map( task => {
          return (
            <li key={ task.id }>
              { task.name }
              <button onClick={()=> destroy(task)}>x</button>
            </li>
          );
        })
      }
    </ul>
  );
}

const mapState = (state)=> {
  return state;
};

const mapDispatch = (dispatch)=> {
  return {
    destroy: async(task)=> {
      await dispatch(destroyTask(task));
    }
  };
};
export default connect(mapState, mapDispatch)(Tasks);
