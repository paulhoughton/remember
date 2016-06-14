const initialState = {
  km: true,
  detailed: false };

export default (state = initialState, action) => action.type === 'SET_SETTING' ?
    Object.assign({}, state, { [action.field]: action.value }) :
    state;

export const setSetting = (field, value) => ({ type: 'SET_SETTING', field, value });
