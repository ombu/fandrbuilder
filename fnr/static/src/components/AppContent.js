import React, { Component, PropTypes } from 'react';
import StylePropable from 'material-ui/lib/mixins/style-propable';

var AppContent = React.createClass({

  displayName: 'AppContent',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  render: function render() {

    var styles = {
      //paddingTop: this.context.muiTheme.component.appBar.height,
      paddingTop: this.context.muiTheme.spacing.desktopGutter,
      paddingLeft: this.context.muiTheme.spacing.desktopGutter,
      paddingRight: this.context.muiTheme.spacing.desktopGutter,
      paddingBottom: this.context.muiTheme.spacing.desktopGutter
    };

    return (
      <div style={styles}>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }

});

module.exports = AppContent;
