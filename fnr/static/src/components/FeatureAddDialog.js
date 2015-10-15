import React, { Component, PropTypes } from 'react';
import {
  Dialog
} from 'material-ui';
import CloseableDialog from './CloseableDialog';
import FeatureForm from './forms/FeatureForm';
import { ifMatchReduce, sortByOrder } from '../util';

class FeatureAddDialog extends Component {

  render() {
    return (
        <CloseableDialog
          title="Add Feature"
          openImmediately={true}
          modal={true}
          onClose={this.props.onCancel}
          autoScrollBodyContent={true}
        >
          <FeatureForm
            name=""
            description=""
            onSubmit={this._onSubmit.bind(this)}
          />
        </CloseableDialog>
    )
  }

  _onSubmit(feature) {
    console.log(feature);
  }

}

export default FeatureAddDialog;
