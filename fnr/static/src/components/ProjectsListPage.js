import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui';
import AppContent from './AppContent';
import Toolbar from './Toolbar';

function mapStateToProps(state) {
  return {
    projectsList: state.projectsList,
  };
}

class ProjectsListPage extends Component {

  render() {
    return (
      <div>
        <Toolbar />
        <AppContent>
          <div>
            <h1>Projects</h1>
            <List>
              {this.props.projectsList.map((projectListItem) => {
                return <ListItem
                          key={projectListItem.id}
                          primaryText={projectListItem.name}
                          onTouchTap={this._itemTouchTap.bind(this, projectListItem)}
                        >
                       </ListItem>
              })}
            </List>
          </div>
        </AppContent>
      </div>
    )
  }

  _itemTouchTap(projectListItem) {
    var path = `/project/${projectListItem.id}/scope/${projectListItem.scopes[0]}`;
    this.context.history.pushState(null, path);
  }

}

ProjectsListPage.propTypes = {
  projectsList: PropTypes.any.isRequired
};

ProjectsListPage.contextTypes = {
  history: PropTypes.object
};

export default connect(mapStateToProps)(ProjectsListPage);
