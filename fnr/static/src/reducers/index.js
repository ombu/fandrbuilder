import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {
  SHOW_ADD_REQUIREMENT,
  SHOW_ADD_FEATURE,
  HIDE_ADD,
  FEATURE_UPDATE_COMPLETE,
  UPDATE_REQUIREMENT,
  PROJECT_LOAD_START,
  PROJECT_LOAD_COMPLETE,
  PROJECT_LOAD_ERROR
} from '../actions';
import { ifMatchReduce } from '../util';

function noopReducer(state = {}) {
  return state;
}

function uiLoadingReducer(state = 0, action) {
  switch(action.type) {

    case PROJECT_LOAD_START:
      return state + 1;

    case PROJECT_LOAD_COMPLETE:
      return state - 1;

    default:
      return state;
  }
}

function uiAddReducer(state = false, action) {
  switch(action.type) {

    case SHOW_ADD_REQUIREMENT:
      return Object.assign({}, state, { add: 'requirement' });

    case SHOW_ADD_FEATURE:
      return Object.assign({}, state, { add: 'feature' });

    case HIDE_ADD:
      return Object.assign({}, state, { add: false });

    default:
      return state;
  }
}

function projectsReducer(projects = {}, action) {
  if (PROJECT_LOAD_COMPLETE === action.type) {
    let project = action.project;
    let changeProjects = {};
    changeProjects[project.id] = normalizeProject(project);
    return Object.assign({}, projects, changeProjects);
  }
  //else if (UPDATE_REQUIREMENT === action.type) {
      //let requirement = action.payload;

      //// Get the requirement scope.
      //let scope = projects.reduce((scopes, p) => { return scopes.concat(p.scopes) }, [])
                            //.reduce(ifMatchReduce('id', requirement.scope), undefined);

      //// Get the requirement project via the scope.
      //let project = projects.reduce(ifMatchReduce('id', scope.project), undefined);
      //let projectIndex = projects.indexOf(project);
      //let oldRequirement = project.requirements.reduce(ifMatchReduce('id', requirement.id), undefined);
      //let requirementIndex = project.requirements.indexOf(oldRequirement);

      //projects = projects.slice();
      //projects[projectIndex].requirements[requirementIndex] = requirement;

      //return projects;

  //}
  return projects;
}

function normalizeProject(project) {
  ['scopes', 'audiences', 'features', 'requirements'].map((field) => {
    project[field] = normalizeModelList(project[field]);
  });
  return project;
}

function normalizeModelList(modelList) {
  let list = [];
  let byId = {};

  modelList.map((model) => {
    list.push(model.id);
    byId[model.id] = model;
  })

  return { list: list, byId: byId };
}

const rootReducer = combineReducers({
  projectsList: noopReducer,
  projectsById: projectsReducer,
  ui: combineReducers({
    add: uiAddReducer,
    loading: uiLoadingReducer
  }),
  routing: routeReducer
});

export default rootReducer;

