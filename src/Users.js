import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const Users = ({ users })=> { 
  return (
    <ul>
      {
        users.map( user => {
          return (
            <li key={ user.id }>
              { user.name }
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

export default connect(mapState )(Users);
