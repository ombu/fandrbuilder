import React, { Component, PropTypes } from 'react';
import { Paper, Card, CardText, Avatar } from 'material-ui'; 

class ScopeCard extends Component {

  render() {
    let scope = this.props.scope;
    let features = this.props.features;
    let requirements = this.props.requirements;
    let styles = {
      padding: 1
    };
    return (
      <div className="scope-card">
        <Paper zDepth={1} style={styles}>
          <div className="scope-card-content">
            <h4>{scope.name}</h4>
            <hr />
            <ul>
              {features.map((f) => {
                return <li key={f.id}><Avatar size={16}>{requirements[f.id].length}</Avatar> {f.name}</li>
              })}
            </ul>
          </div>
        </Paper>
      </div>
    )
  }
}

ScopeCard.contextTypes = {
  muiTheme: PropTypes.object
};


export default ScopeCard;
