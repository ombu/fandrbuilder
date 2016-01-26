import fetch from 'isomorphic-fetch';

export const SHOW_ADD_REQUIREMENT = 'SHOW_ADD_REQUIREMENT';
export const SHOW_ADD_FEATURE = 'SHOW_ADD_FEATURE';
export const HIDE_ADD = 'HIDE_ADD';

export const FEATURE_UPDATE_START = 'FEATURE_UPDATE_START';
export const FEATURE_UPDATE_COMPLETE = 'FEATURE_UPDATE_COMPLETE';
export const FEATURE_UPDATE_ERROR = 'FEATURE_UPDATE_ERROR';

export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';

export const PROJECT_LOAD_START = 'PROJECT_LOAD_START';
export const PROJECT_LOAD_COMPLETE = 'PROJECT_LOAD_COMPLETE';
export const PROJECT_LOAD_ERROR = 'PROJECT_LOAD_ERROR';

const apiPath = window.FnR.apiPath;

export function showAddRequirement() {
  return { type: SHOW_ADD_REQUIREMENT };
}

export function showAddFeature() {
  return { type: SHOW_ADD_FEATURE };
}

export function hideAdd() {
  return { type: HIDE_ADD };
}

export function updateFeature(feature) {
  return (dispatch, getState) => {

    dispatch({ type: FEATURE_UPDATE_START });

    fetch(`${apiPath}/features/${feature.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feature)
      })
      .then((resp) => resp.json())
      .then((feature) => {
        dispatch(loadProject(feature.project));
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return { type: UPDATE_FEATURE, payload: feature };
}

export function updateRequirement(requirement) {
  return { type: UPDATE_REQUIREMENT, payload: requirement };
}

export function loadProject(id) {
  return (dispatch, getState) => {

    dispatch({ type: PROJECT_LOAD_START });

    fetch(`${apiPath}/projects/${id}`)
      .then((resp) => resp.json())
      .then((project) => {
        dispatch({type: PROJECT_LOAD_COMPLETE, project: project });
      })
      .catch((error) => {
        console.log(error);
      });

  };
}
