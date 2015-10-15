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
import { ifMatchReduce, sortByOrder } from '../util';


function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}


class FeatureDialog extends Component {

  componentWillMount() {
    let id = parseInt(this.props.params.featureId, 10);
    this.project = this.props.projects.reduce(ifMatchReduce('id', parseInt(this.props.params.projectId, 10)), undefined);
    this.feature = this.project.features.reduce(ifMatchReduce('id', id), undefined);
  }

  render() {

    let feature = this.feature;
    let classes = 'feature-dialog';

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
                <p>{this.feature.description}</p>
                <p>Effort: {this.feature.effort}</p>
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
    let feature = this.feature;
    let activeRequirementId = parseInt(this.props.params.requirementId, 10);
    let requirementsByScope = this.project.requirements
                                          .filter((r) => r.feature == feature.id)
                                          .reduce(function(requirementsByScope, r) {
                                            if (!requirementsByScope[r.scope]) {
                                              requirementsByScope[r.scope] = [];
                                            }
                                            requirementsByScope[r.scope].push(r);
                                            return requirementsByScope;
                                          }, {});
    let scopesAndRequirements = Object.keys(requirementsByScope)
                                      .map((scopeId) => this.project.scopes.reduce(ifMatchReduce('id', scopeId), undefined))
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
    let activeTab = this.props.location.pathname.split('/').pop();
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
      let requirementId = parseInt(this.props.params.requirementId, 10);
      let requirement = this.project.requirements.reduce(ifMatchReduce('id', requirementId), undefined);
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
      scope: this.project.scopes.reduce(ifMatchReduce('id', requirement.scope), undefined),
      audience: this.project.audiences.reduce(ifMatchReduce('id', requirement.audience), undefined)
    };
  }

  _getRequirementEditProps(requirement) {
    return {
      requirement: requirement,
      scopes: this.project.scopes.map((s) => { return {id: s.id, name: s.name}; }),
      features: this.project.features.map((f) => {return {id: f.id, name: f.name}; }),
      audiences: this.project.audiences,
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
