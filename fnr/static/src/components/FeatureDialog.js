import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  FlatButton,
  IconButton,
  FontIcon,
  List,
  ListItem,
  Tabs,
  Tab
} from 'material-ui';
import CloseableDialog from './CloseableDialog';
import { updateRequirement } from '../actions';
import { ifMatchReduce, sortByOrder, pluck, denormalize, trim } from '../util';


function mapStateToProps(state, ownProps) {
  return {
    project: state.projectsById[ownProps.params.projectId] || undefined,
    feature: state.projectsById[ownProps.params.projectId].features.byId[ownProps.params.featureId] || undefined
  };
}


class FeatureDialog extends Component {

  render() {

    let project = this.props.project;
    let feature = this.props.feature;
    let classes = 'feature-dialog';

    if (!project || !feature) {
      return;
    }

    if (this.props.children) {
      classes += ' has-children';
    }

    return (
        <CloseableDialog
          title={feature.name}
          openImmediately={true}
          modal={true}
          onClose={this._dialogClose.bind(this)}
          bodyStyle={{padding: 0}}
          autoScrollBodyContent={true}
          actions={false}
        >
          <div className={classes}>
            <div className="feature-scope-list">
              <div className="feature-info">
                <p>{feature.description}</p>
                <p>Effort: {feature.effort}</p>
                <FlatButton label="Edit" onClick={this._editClick.bind(this)} />
                <hr />
              </div>
              {this._renderScopes()}
            </div>
            <div className="feature-dialog-children">
              {this._renderTabs()}
            </div>
          </div>
        </CloseableDialog>
    )
  }

  _renderScopes() {
    let project = this.props.project;
    let feature = this.props.feature;
    let activeRequirementId = parseInt(this.props.params.requirementId, 10);
    let requirementsByScope = project.requirements.list
                                          .map(pluck(project.requirements.byId))
                                          .filter((r) => r.feature == feature.id)
                                          .reduce(function(requirementsByScope, r) {
                                            if (!requirementsByScope[r.scope]) {
                                              requirementsByScope[r.scope] = [];
                                            }
                                            requirementsByScope[r.scope].push(r);
                                            return requirementsByScope;
                                          }, {});
    let scopesAndRequirements = Object.keys(requirementsByScope)
                                      .map((scopeId) => project.scopes.byId[scopeId])
                                      .sort(sortByOrder);

    return scopesAndRequirements.map(function(scope) {
        return (
          <List subheader={scope.name}>
          {requirementsByScope[scope.id].map(function(requirement) {
            let className = 'scope-item' + (requirement.id === activeRequirementId ? ' active' : '');
            return <ListItem
                      primaryText={requirement.requirement}
                      className={className}
                      onClick={this._requirementTab.bind(this, requirement.id, 'info')}
                    />
          }.bind(this))}
          </List>
        );
     }.bind(this));
  }

  _renderTabs() {
    let activeTab = trim('/', this.props.location.pathname).split('/').pop();
    let infoChildren = (activeTab === 'info') ? this.props.children : undefined;
    let editChildren = (activeTab === 'edit') ? this.props.children : undefined;

    function onChange(value, e, tab) {
      this._requirementTab(this.props.params.requirementId, value);
    }

    let tabStyle = {
      padding: this.context.muiTheme.spacing.desktopGutter
    };

    let requirement = undefined;
    if (this.props.params.requirementId) {
      let requirement = this.props.project.requirements.byId[this.props.params.requirementId];
      if (activeTab === 'info') {
        infoChildren = React.cloneElement(infoChildren, this._getRequirementInfoProps(requirement));
      }
      else if (activeTab === 'edit') {
        editChildren = React.cloneElement(editChildren, this._getRequirementEditProps(requirement));
      }
    }

    return (
      <Tabs value={activeTab} onChange={onChange.bind(this)} contentContainerStyle={tabStyle}>
        <Tab label="Info" value="info">{infoChildren}</Tab>
        <Tab label="Edit" value="edit">{editChildren}</Tab>
      </Tabs>
    );
  }

  _getRequirementInfoProps(requirement) {
    return {
      requirement: requirement,
      scope: this.props.project.scopes.byId[requirement.scope],
      audience: this.props.project.audiences.byId[requirement.audience]
    };
  }

  _getRequirementEditProps(requirement) {
    return {
      requirement: requirement,
      scopes: denormalize(this.props.project.scopes),
      features: denormalize(this.props.project.features),
      audiences: denormalize(this.props.project.audiences),
      onRequirementSave: this._onRequirementSave.bind(this, requirement)
    };
  }

  _onRequirementSave(oldRequirement, newRequirement) {
    this.props.dispatch(updateRequirement(newRequirement));
    if (oldRequirement.feature === newRequirement.feature) {
      this._requirementTab(newRequirement.id, 'info');
    }
    else {
      let { projectId, scopeId, featureId } = this.props.params;
      let path = `/project/${projectId}/scope/${scopeId}/feature/${featureId}`;
      this.context.history.pushState(null, path);
    }
  }

  _dialogClose() {
    let { projectId, scopeId } = this.props.params;
    let path = `/project/${projectId}/scope/${scopeId}`;
    this.context.history.pushState(null, path);
  }

  _requirementTab(requirementId, mode) {
    let { projectId, scopeId, featureId } = this.props.params;
    let path = `/project/${projectId}/scope/${scopeId}/feature/${featureId}/requirement/${requirementId}/${mode}`;
    this.context.history.pushState(null, path);
  }

  _editClick() {
    let { projectId, scopeId, featureId } = this.props.params;
    let path = `/project/${projectId}/scope/${scopeId}/feature/${featureId}/edit`;
    this.context.history.pushState(null, path);
  }

}

FeatureDialog.contextTypes = {
  muiTheme: PropTypes.object,
  history: PropTypes.object
};


export default connect(mapStateToProps)(FeatureDialog);
