import { moviesConstants } from '../constants/moviesConstants'

const initialState = {movies: [], liked: false, page: 1};

function moviesReducer(state = initialState, action)
{
  switch (action.type)
  {
    case moviesConstants.GET_MOVIES:
      return {movies: action.data, liked: false, page: state.page};
    default:
      return state;
  }
}

export default moviesReducer