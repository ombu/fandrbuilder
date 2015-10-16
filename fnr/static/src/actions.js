export const SHOW_ADD_REQUIREMENT = 'SHOW_ADD_REQUIREMENT';
export const SHOW_ADD_FEATURE = 'SHOW_ADD_FEATURE';
export const HIDE_ADD = 'HIDE_ADD';

export const UPDATE_FEATURE = 'UPDATE_FEATURE';
export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';

export const PROJECT_LOAD_START = 'PROJECT_LOAD_START';
export const PROJECT_LOAD_COMPLETE = 'PROJECT_LOAD_COMPLETE';
export const PROJECT_LOAD_ERROR = 'PROJECT_LOAD_ERROR';

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
  return { type: UPDATE_FEATURE, payload: feature };
}

export function updateRequirement(requirement) {
  return { type: UPDATE_REQUIREMENT, payload: requirement };
}

export function loadProject(id) {
  return (dispatch, getState) => {

    dispatch({ type: PROJECT_LOAD_START });

    setTimeout(() => {
      dispatch({type: PROJECT_LOAD_COMPLETE });
    }, 2000)

  };
}
