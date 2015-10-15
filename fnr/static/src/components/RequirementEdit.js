import React, { Component, PropTypes } from 'react';
import RequirementForm from './forms/RequirementForm';

class RequirementEdit extends Component {

  render() {
    return (
        <RequirementForm
          requirement={this.props.requirement}
          onSubmit={this.props.onRequirementSave}
          scopes={this.props.scopes}
          features={this.props.features}
          audiences={this.props.audiences}
        />
    );
  }

}

RequirementEdit.propTypes = {
  requirement: PropTypes.object,
  onSubmit: PropTypes.func,
  scopes: PropTypes.array,
  features: PropTypes.array,
  audiences: PropTypes.array
};


export default RequirementEdit;
