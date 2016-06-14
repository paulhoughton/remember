import { LOCAL_STORAGE_KEY } from '../constants';

const storage = localStorage[LOCAL_STORAGE_KEY];

const initialState = {
  current: {
    description: '',
    editing: false
  },
  geo: {
    latitude: undefined,
    longitude: undefined,
    orientation: null,
    accuracy: undefined,
    lastUpdate: undefined
  },
  selected: {
    index: null,
    text: ''
  },
  locations: (storage && JSON.parse(storage)) || []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_GEO':
      return {
        ...state,
        geo: {
          ...state.geo,
          ...action.geo
        }
      };
    case 'ADD_CURRENT':
      return {
        ...state,
        current: { description: '', editing: false },
        locations: state.locations.concat({
          latitude: state.geo.latitude,
          longitude: state.geo.longitude,
          desc: state.current.description })
      };
    case 'DELETE_LOCATION':
      return {
        ...state,
        locations: state.locations.filter((d, i) => action.index !== i)
      };
    case 'SHOW_NEW_LOCATION':
      return {
        ...state,
        current: { editing: action.show, description: '' }
      };
    case 'CURRENT_LOCATION_DESC':
      return {
        ...state,
        current: { ...state.current, description: action.desc }
      };
    case 'SET_SELECTED':
      return {
        ...state,
        selected: { index: action.id, text: action.id === null ? null : state.locations[action.id].desc }
      };
    case 'SET_SELECTED_TEXT':
      return {
        ...state,
        selected: { ...state.selected, text: action.desc }
      };
    case 'CONFIRM_SELECTED':
      return {
        ...state,
        locations: state.locations.map((d, i) => (state.selected.index !== i ? d :
          {
            latitude: d.latitude,
            longitude: d.longitude,
            desc: state.selected.text
          })),
        selected: { index: null, text: '' }
      };
    case 'DELETE_SELECTED':
      return {
        ...state,
        locations: state.locations.filter((d, i) => state.selected.index !== i),
        selected: { index: null, text: '' }
      };
    default:
      return state;
  }
}

export const updateGeo = (geo) => ({ type: 'UPDATE_GEO', geo });
export const showNewLocation = (show) => ({ type: 'SHOW_NEW_LOCATION', show });
export const addCurrent = () => ({ type: 'ADD_CURRENT' });
export const currentLocationDesc = (desc) => ({ type: 'CURRENT_LOCATION_DESC', desc });
export const confirmSelected = () => ({ type: 'CONFIRM_SELECTED' });
export const deleteSelected = () => ({ type: 'DELETE_SELECTED' });
export const setSelectedText = (desc) => ({ type: 'SET_SELECTED_TEXT', desc });
export const setSelected = (id) => ({ type: 'SET_SELECTED', id });
