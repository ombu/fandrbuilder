import { combineReducers } from 'redux';
import {
  SHOW_ADD_REQUIREMENT,
  SHOW_ADD_FEATURE,
  HIDE_ADD,
  UPDATE_FEATURE,
  UPDATE_REQUIREMENT
} from '../actions';
import { ifMatchReduce } from '../util';

function uiReducer(state = {}, action) {
  switch(action.type) {
    case SHOW_ADD_REQUIREMENT:
      return Object.assign({}, state, { add: 'requirement' });
    case SHOW_ADD_FEATURE:
      return Object.assign({}, state, { add: 'feature' });
    case HIDE_ADD:
      return Object.assign({}, state, { add: undefined });
    default: 
      return state;
  }
}

function projectsReducer(projects = [], action) {
  if (UPDATE_FEATURE === action.type) {
      let feature = action.payload;
      let project = projects.reduce(ifMatchReduce('id', feature.project), undefined);
      let projectIndex = projects.indexOf(project);
      let oldFeature = project.features.reduce(ifMatchReduce('id', feature.id), undefined);
      let featureIndex = project.features.indexOf(oldFeature);

      projects = projects.slice();
      projects[projectIndex].features[featureIndex] = feature;

      return projects;

  }
  else if (UPDATE_REQUIREMENT === action.type) {
      let requirement = action.payload;

      // Get the requirement scope.
      let scope = projects.reduce((scopes, p) => { return scopes.concat(p.scopes) }, [])
                            .reduce(ifMatchReduce('id', requirement.scope), undefined);

      // Get the requirement project via the scope.
      let project = projects.reduce(ifMatchReduce('id', scope.project), undefined);
      let projectIndex = projects.indexOf(project);
      let oldRequirement = project.requirements.reduce(ifMatchReduce('id', requirement.id), undefined);
      let requirementIndex = project.requirements.indexOf(oldRequirement);

      projects = projects.slice();
      projects[projectIndex].requirements[requirementIndex] = requirement;

      return projects;

  }
  return projects;
}

const rootReducer = combineReducers({
  projects: projectsReducer,
  ui: uiReducer
});

export default rootReducer;
