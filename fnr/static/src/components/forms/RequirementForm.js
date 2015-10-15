import React, { Component, PropTypes } from 'react';
import {
  TextField,
  SelectField,
  RaisedButton
} from 'material-ui';

class RequirementForm extends Component {

  componentWillMount() {
    this.requirementTypes = [
      { payload: 'User Story', text: 'User Story' },
      { payload: 'Validation', text: 'Validation' }
    ];
    this.setState(Object.assign({}, this.props.requirement));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, nextProps.requirement));
  }

  render() {
    return (
      <form onSubmit={this._onSubmit.bind(this)} onChange={this._onFormChange.bind(this)}>

        <TextField
          floatingLabelText="Requirement"
          multiLine={true}
          value={this.state.requirement}
          name="requirement" />

        <br />

        <SelectField
          floatingLabelText="Feature"
          value={this.state.feature}
          menuItems={this.props.features}
          valueMember="id"
          displayMember="name"
          onChange={this._onFieldChange.bind(this, 'feature')}
          />

        <br />

        <SelectField
          floatingLabelText="Scope"
          value={this.state.scope}
          menuItems={this.props.scopes}
          valueMember="id"
          displayMember="name"
          onChange={this._onFieldChange.bind(this, 'scope')}
          />

        <br />

        <SelectField
          floatingLabelText="Audience"
          value={this.state.audience}
          menuItems={this.props.audiences}
          valueMember="id"
          displayMember="name"
          onChange={this._onFieldChange.bind(this, 'audience')}
          />

        <br />

        <SelectField
          floatingLabelText="Type"
          value={this.state.type}
          menuItems={this.requirementTypes}
          onChange={this._onFieldChange.bind(this, 'type')}
          />

        <br />

        <TextField
          floatingLabelText="Effort"
          value={this.state.effort}
          name="effort" />

        <br />

        <RaisedButton label="Save" primary={true} onClick={this._onSubmit.bind(this)} />

      </form>
    )
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  _onFormChange(e) {
    e.preventDefault();
    e.stopPropagation();
    this._onFieldChange(e.target.name, e);
  }

  _onFieldChange(name, e) {
    var stateChange = {};
    stateChange[name] = e.target.value;
    this.setState(stateChange);
  }

}

RequirementForm.propTypes = {
  requirement: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  scopes: PropTypes.array.isRequired,
  features: PropTypes.array.isRequired,
  audiences: PropTypes.array.isRequired
};

RequirementForm.defaultProps = {
  requirement: {},
  onSubmit: function() {}
};

export default RequirementForm;
