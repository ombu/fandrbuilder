import React, { Component, PropTypes } from 'react';
import { ifMatchReduce, sortByOrder } from '../util';

class RequirementInfo extends Component {

  render() {
    let requirement = this.props.requirement;
    let scope = this.props.scope;
    let audience = this.props.audience;
    let type = requirement.type;

    return (
      <div>
        <dl>
          <dt>Scope:</dt><dd>{scope.name}</dd>
          <dt>Audience:</dt><dd>{audience.name}</dd>
          <dt>Effort:</dt><dd>{requirement.effort}</dd>
          <dt>Type:</dt><dd>{type}</dd>
        </dl>
      </div>
    );
  }
}

RequirementInfo.propTypes = {
  requirement: PropTypes.object,
  scope: PropTypes.object,
  audience: PropTypes.object,
  type: PropTypes.string
};


export default RequirementInfo;
