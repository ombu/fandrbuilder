import React, { Component, PropTypes } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  FlatButton,
  IconMenu,
  IconButton,
  FontIcon
} from 'material-ui';

import MenuItem from 'material-ui/lib/menus/menu-item';

class FnRToolbar extends Component {

  render() {
    let toolbarStyles = {
      backgroundColor: this.context.muiTheme.component.appBar.color
    };

    return (
      <Toolbar className="fnr-toolbar" style={toolbarStyles}>
        <ToolbarGroup float="left">
          <FlatButton
            label="F&R"
            primary={true}
            style={{marginLeft: 0}}
            onTouchTap={() => {this.context.history.pushState(null, '/')}}
            />
        </ToolbarGroup>
        {this.props.children}
      </Toolbar>
    )
  }

}

FnRToolbar.propTypes = {
  children: PropTypes.any
};

FnRToolbar.contextTypes = {
  muiTheme: PropTypes.object,
  history: PropTypes.object
};

export default FnRToolbar;
