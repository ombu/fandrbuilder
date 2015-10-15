import React, { Component, PropTypes } from 'react';
import {
  Card,
  CardHeader,
  CardText,
  Avatar
} from 'material-ui'; 

class FeatureCard extends Component {

  render() {
    let feature = this.props.feature;
    let requirements = this.props.requirements;
    let subtitle = `${requirements.length} requirements, ${feature.effort} effort`;
    let avatar = <Avatar size={0} style={{marginRight: 0}}>{requirements.length}</Avatar>;
    return (
      <div className="feature-card" onClick={this.props.onClick}>
        <Card>
          <CardHeader
            title={feature.name}
            subtitle={subtitle}
            avatar={avatar}
          />
        </Card>
      </div>
    )
  }
}

FeatureCard.contextTypes = {
  muiTheme: PropTypes.object,
  history: PropTypes.object
};


export default FeatureCard;
