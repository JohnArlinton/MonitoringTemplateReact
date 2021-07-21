// constants
const dataInitial = {
  center: [47.3136, -1.3196],
  marker: {lat: 47.3136, lng: -1.3196},
}


// types
const SET_VALUES = 'SET_VALUES'

// reducers
export default function mapReducer(state = dataInitial, action){
  switch(action.type){
    case SET_VALUES:
      return {...state, center: action.payload.center, marker: action.payload.marker}
    default:
      return state
  }
}


// actions

export const setNewCoordinates = (params) => async (dispatch, getState) => {  
  console.log(getState().map, params)
  const center = [params.lat, params.lng]
  try {
    dispatch({
      type: SET_VALUES,
      payload: {
        center: center,
        marker: params
      }
    })
  } catch (error) {
    console.log(error)
  }
}