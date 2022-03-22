import React from 'react';
import Create from './Create';
import { connect }  from 'react-redux';

const Header = ({ tasks, users })=> {
  return (
    <div>
      <h1>Prof Tasks ({tasks.length} tasks) ({ users.length} users)</h1>
      <Create />
    </div>
  );
};

const mapStateToProps = function(state){
  return state;
};
export default connect(state => state)(Header);
