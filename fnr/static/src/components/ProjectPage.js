import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import {
  Dialog,
  ToolbarGroup,
  ToolbarTitle,
  FlatButton,
  Paper,
  IconMenu,
  IconButton,
  FontIcon
} from 'material-ui';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AppContent from './AppContent';
import Toolbar from './Toolbar';
import FeatureCard from './FeatureCard';
import ScopeCard from './ScopeCard';
import FeatureAddDialog from './FeatureAddDialog';
import RequirementAddDialog from './RequirementAddDialog';

import { ifMatchReduce, onlyUnique } from '../util';

import {
  showAddRequirement,
  showAddFeature,
  hideAdd,
  loadProject
} from '../actions';

function mapStateToProps(state) {
  return {
    projects: state.projects,
    ui: {
      add: state.ui.add,
      loading: state.ui.loading
    }
  };
}

class ProjectPage extends Component {

  componentWillMount() {
    let id = parseInt(this.props.params.projectId, 10);
    this.project = this.props.projects[id] || undefined;
    if (!this.project) {
      this.props.dispatch(loadProject(id));
    }
  }

  render() {

    let project = this.project;

    if (!project) {
      return (
        <div className="project-scope-page">
          <Toolbar loading={this.props.ui.loading}>
          </Toolbar>
        </div>
      )
    }

    let scopeId = parseInt(this.props.params.scopeId, 10);
    let activeScope = project.scopes.reduce(ifMatchReduce('id', scopeId), undefined);
    let otherScopes = project.scopes.filter((s) => s.id !== activeScope.id);

    return (
      <div className="project-scope-page">
        <Toolbar loading={this.props.ui.loading}>
          <ToolbarGroup className="scope-buttons" float="left">
            <ToolbarTitle text={project.name} />
          </ToolbarGroup>
          {this._renderToolbarContents(project, activeScope)}
        </Toolbar>
        {this._renderActiveScope(project, activeScope)}
        {this._renderOtherScopes(project, otherScopes)}
        {this.props.children}
        {this._renderAddDialogs(this.props.ui.add)}
      </div>
    )
  }

  _renderToolbarContents(project, activeScope) {
    let activeScopeId = activeScope.id;
    let scopeButtons = [];
    if (project.scopes) {
      scopeButtons = project.scopes.map((scope) => {
        let isActive = scope.id === activeScopeId;
        let className = isActive ? 'active' : '';
        return (
          <FlatButton
            label={scope.name}
            onTouchTap={() => {this.context.history.pushState(null, `/project/${project.id}/scope/${scope.id}`)}}
            style={{marginLeft: 0, marginRight: 10}}
            className={className}
            key={scope.id}
            />
        )
      });
    }

    let addButton = <IconButton><FontIcon className="material-icons">add</FontIcon></IconButton>
    let dispatch = this.props.dispatch;

    return (
      <ToolbarGroup float="right">
        <IconMenu iconButtonElement={addButton}>
          <MenuItem primaryText="Requirement" index={0} onTouchTap={() => dispatch(showAddRequirement())} />
          <MenuItem primaryText="Feature" index={1} onTouchTap={() => dispatch(showAddFeature())} />
        </IconMenu>
        {scopeButtons}
      </ToolbarGroup>
    );
  }

  _renderActiveScope(project, scope) {
    let features = project.requirements
                          .filter((r) => r.scope === scope.id)
                          .map((r) => r.feature)
                          .filter(onlyUnique)
                          .map((featureId) => project.features.reduce(ifMatchReduce('id', featureId)));
    let featureCards = features.map(function(f) {
      let requirements = project.requirements.filter((r) => {
                            return r.feature === f.id && r.scope === scope.id;
                          });
      return (
        <FeatureCard
          key={f.id}
          mode="compact"
          feature={f}
          requirements={requirements}
          onClick={this.featureCardClick.bind(this, f)}
        />
      )
    }.bind(this));
    let styles = {
      padding: 1,
      margin: this.context.muiTheme.spacing.desktopGutter
    };

    let content = (featureCards.length) ? featureCards : <em>Empty</em>;

    return (
      <div className="active-scope">
        <Paper zDepth={1} style={styles}>
          <div className="card-wrapper">
            {content}
          </div>
        </Paper>
      </div>
    );

  }

  featureCardClick(feature, e) {
    var path = `/project/${this.props.params.projectId}/scope/${this.props.params.scopeId}/feature/${feature.id}`;
    this.context.history.pushState(null, path);
  }

  _renderOtherScopes(project, scopes) {
    let scopeCards = scopes.map(function(scope) {
      let features = project.requirements
                            .filter((r) => r.scope === scope.id)
                            .map((r) => r.feature)
                            .filter(onlyUnique)
                            .map(function(featureId) {
                              return project.features.reduce(ifMatchReduce('id', featureId));
                            });
      let requirements = features.reduce(function(requirements, feature) {
        requirements[feature.id] = project.requirements.filter((r) => {
                                    return (r.scope === scope.id && r.feature === feature.id);
                                   });
        return requirements;
      }, {});
      return <ScopeCard key={scope.id} scope={scope} features={features} requirements={requirements} />
    });
    return (
      <div className="other-scopes">
        {scopeCards}
      </div>
    );
  }

  _renderAddDialogs(addType) {
    let projectId = this.props.params.projectId;
    let scopeId = this.props.params.scopeId;
    let dispatch = this.props.dispatch;

    if (addType === 'feature') {
      return <FeatureAddDialog
                projectId={projectId}
                defaultScopeId={scopeId}
                onCancel={() => dispatch(hideAdd())}
             />
    }
    else if (addType === 'requirement') {
      return <RequirementAddDialog
                projectId={projectId}
                defaultScopeId={scopeId}
                onCancel={() => dispatch(hideAdd())}
             />
    }
    return undefined;
  }

}

ProjectPage.contextTypes = {
  history: PropTypes.object,
  muiTheme: PropTypes.object
};


export default connect(mapStateToProps)(ProjectPage);
