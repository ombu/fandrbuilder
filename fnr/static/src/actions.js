
export const SHOW_ADD_REQUIREMENT = 'SHOW_ADD_REQUIREMENT';
export const SHOW_ADD_FEATURE = 'SHOW_ADD_FEATURE';
export const UPDATE_FEATURE = 'UPDATE_FEATURE';
export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';
export const HIDE_ADD = 'HIDE_ADD';

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
