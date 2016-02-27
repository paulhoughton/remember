export default (storageName, key, name) => store => next => action => {
  const prev = store.getState()[key][name];
  const result = next(action);
  const state = store.getState()[key][name];
  if (state !== prev) {
    localStorage.setItem(storageName, JSON.stringify(state));
  }
  return result;
};
