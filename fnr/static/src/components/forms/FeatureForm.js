import React, { Component, PropTypes } from 'react';
import {
  TextField,
  RaisedButton
} from 'material-ui';

class FeatureForm extends Component {

  componentWillMount() {
    this.setState(Object.assign({}, this.props.feature));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, nextProps.feature));
  }

  render() {
    return (
      <form onSubmit={this._onSubmit.bind(this)} onChange={this._onChange.bind(this)}>

        <TextField
          floatingLabelText="Name"
          value={this.state.name}
          name="name" />

        <br />

        <TextField
          floatingLabelText="Description"
          multiLine={true}
          value={this.state.description}
          name="description" />

        <br />

        <TextField
          floatingLabelText="Effort"
          value={this.state.effort}
          name="effort" />

        <br />
        <br />

        <RaisedButton label="Save" primary={true} onClick={this._onSubmit.bind(this)} />

      </form>
    )
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  _onChange(e) {
    var stateChange = {};
    stateChange[e.target.name] = e.target.value;
    this.setState(stateChange);
  }

}

FeatureForm.propTypes = {
  feature: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};


FeatureForm.defaultProps = {
  feature: {},
  onSubmit: function() {}
};


export default FeatureForm;
