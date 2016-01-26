import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Dialog
} from 'material-ui';
import CloseableDialog from './CloseableDialog';
import FeatureForm from './forms/FeatureForm';
import { ifMatchReduce, sortByOrder, toInt } from '../util';
import { updateFeature } from '../actions';

function mapStateToProps(state, ownProps) {
  return {
    feature: state.projectsById[ownProps.params.projectId].features.byId[ownProps.params.featureId] || undefined
  };
}

class FeatureEditDialog extends Component {

  render() {
    return (
        <CloseableDialog
          title="Edit Feature"
          openImmediately={true}
          modal={true}
          onClose={this._onClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <FeatureForm
            feature={this.props.feature}
            onSubmit={this._onSubmit.bind(this)}
          />
        </CloseableDialog>
    )
  }

  _onSubmit(feature) {
    let updatedFeature = Object.assign({}, this.feature, feature);
    this.props.dispatch(updateFeature(updatedFeature));
    this._onClose();
  }

  _onClose() {
    let { projectId, scopeId, featureId } = this.props.params;
    let path = `/project/${projectId}/scope/${scopeId}/feature/${featureId}`;
    this.context.history.pushState(null, path);
  }

}

FeatureEditDialog.contextTypes = {
  history: PropTypes.object
};


export default connect(mapStateToProps)(FeatureEditDialog);
