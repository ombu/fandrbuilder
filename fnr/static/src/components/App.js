import React, { Component, PropTypes } from 'react';
import { AppCanvas } from 'material-ui'; 

class App extends Component {

  render() {
    return (
      <AppCanvas>
        {this.props.children}
      </AppCanvas>
    );
  }
}

App.propTypes = {
  children: PropTypes.any.isRequired
};


export default App
