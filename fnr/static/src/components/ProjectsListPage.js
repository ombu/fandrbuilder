import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui';
import AppContent from './AppContent';
import Toolbar from './Toolbar';

function mapStateToProps(state) {
  return {
    projects: state.projects,
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
              {this.props.projects.map((project) => {
                return <ListItem
                          key={project.id}
                          primaryText={project.name}
                          onTouchTap={this._itemTouchTap.bind(this, project)}
                        >
                       </ListItem>
              })}
            </List>
          </div>
        </AppContent>
      </div>
    )
  }

  _itemTouchTap(project) {
    var path = `/project/${project.id}/scope/${project.scopes[0].id}`;
    this.context.history.pushState(null, path);
  }

}

ProjectsListPage.propTypes = {
  projects: PropTypes.any.isRequired
};

ProjectsListPage.contextTypes = {
  history: PropTypes.object
};


export default connect(mapStateToProps)(ProjectsListPage);
