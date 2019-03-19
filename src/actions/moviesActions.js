import { moviesConstants } from '../constants/moviesConstants';
import { moviesList } from '../movies';

export const moviesActions = {
  getMovies
};

function getMovies()
{
  return {
    type: moviesConstants.GET_MOVIES,
    data: []
  };
}