const initialState = {
  km: true,
  detailed: false };

export default (state = initialState, action) => action.type === 'SETTINGS' ?
    Object.assign({}, state, { [action.field]: action.value }) :
    state;
