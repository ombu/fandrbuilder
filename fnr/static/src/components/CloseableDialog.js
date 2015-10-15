import React, { Component, PropTypes } from 'react';
import {
  Dialog,
  IconButton,
  FontIcon
} from 'material-ui'; 

class CloseableDialog extends Component {

  render() {

    let closeStyles = {
      position: 'absolute',
      right: 0,
      top: 0
    };

    // Pass a blank element if there are no actions.
    let props = Object.assign({}, this.props);
    props.actions = props.actions || [<span></span>];

    return (
      <Dialog {...props} >
        <IconButton onClick={this.props.onClose} className="button-close" style={closeStyles}><FontIcon className="material-icons">clear</FontIcon></IconButton>
        {this.props.children}
      </Dialog>
    );
  }
}

export default CloseableDialog;
