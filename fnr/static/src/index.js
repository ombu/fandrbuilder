import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './store/store';
import mui from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';
import ProjectsListPage from './components/ProjectsListPage';
import ProjectPage from './components/ProjectPage';
import FeatureDialog from './components/FeatureDialog';
import FeatureEditDialog from './components/FeatureEditDialog';
import RequirementInfo from './components/RequirementInfo';
import RequirementEdit from './components/RequirementEdit';
import './scss/main.scss';
import initialState from './store/devInitialState';

injectTapEventPlugin();

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.palette.canvasColor = 'transparent';

const store = configureStore(initialState);
const history = createBrowserHistory();

class Root extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  render() {
    return (
      <Provider store={store} key="provider">
        <Router history={history}>
          <Route component={App}>
            <Route name="home" path="/" component={ProjectsListPage} />
            <Route name="project" path="project/:projectId/scope/:scopeId" component={ProjectPage} >
              <Route name="project-feature-edit" path="feature/:featureId/edit" component={FeatureEditDialog} />
              <Route name="project-feature" path="feature/:featureId" component={FeatureDialog}>
                  <Route name="project-feature-requirement-info" path="requirement/:requirementId/info" component={RequirementInfo} />
                  <Route name="project-feature-requirement-edit" path="requirement/:requirementId/edit" component={RequirementEdit} />
              </Route>
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}

// Pass Material-UI theme to children.
Root.childContextTypes = {
  muiTheme: React.PropTypes.object
};


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
