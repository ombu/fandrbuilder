import React, { Component, PropTypes } from 'react';
import {
  AppCanvas,
  Paper
} from 'material-ui'; 
import Toolbar from './Toolbar';

class NotFound extends Component {

  render() {

    let styles = {
      padding: '1em',
      margin: this.context.muiTheme.spacing.desktopGutter,
      textAlign: 'center'
    };

    return (
      <div>
        <Toolbar />
        <AppCanvas>
          <Paper zDepth={1} style={styles}>
            <strong>404 Not Found</strong>
          </Paper>
        </AppCanvas>
      </div>
    );
  }
}

NotFound.contextTypes = {
  muiTheme: PropTypes.object
};

export default NotFound
