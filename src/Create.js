import React from 'react';
import { connect } from 'react-redux';
import { createTask } from './store';


const Create = ({ create })=> {
  return (
    <button onClick={ create }>Create A Task</button>
  );
}

const mapDispatch = (dispatch)=> {
  return {
    create: async()=> {
      await dispatch(createTask());
    }
  };
};

export default connect(null, mapDispatch)(Create);
