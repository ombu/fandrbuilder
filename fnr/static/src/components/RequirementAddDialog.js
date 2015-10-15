import React, { Component, PropTypes } from 'react';
import {
  Dialog
} from 'material-ui';
import CloseableDialog from './CloseableDialog';
import { ifMatchReduce, sortByOrder } from '../util';


class RequirementAddDialog extends Component {

  render() {

    return (
        <CloseableDialog
          title="Add Requirement"
          openImmediately={true}
          modal={true}
          onClose={this.props.onCancel}
          autoScrollBodyContent={true}
        >
          (form here defaulting to scope {this.props.defaultScopeId})
        </CloseableDialog>
    )
  }

}

RequirementAddDialog.propTypes = {
  onCancel: PropTypes.func,
  projectId: PropTypes.string.isRequired,
  defaultScopeId: PropTypes.string
};


export default RequirementAddDialog;
