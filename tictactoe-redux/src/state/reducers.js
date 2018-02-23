// External Dependencies
import { combineReducers } from 'redux'

// Local Dependencies
import {
  JUMP_TO_MOVE,
  O_MOVES,
  X_MOVES,
} from './action-types';

// Reducers:
// These each manage a specific variable in the Redux state which only update
// for specific types of actions.
const stepNumber = (state = 0, action) => {
  switch (action.type) {
    case O_MOVES: case X_MOVES: return ++state;
    case JUMP_TO_MOVE: return action.step;
    default: return state;
  }
};

const xIsNext = (state = true, action) => {
  switch (action.type) {
    case O_MOVES: return true;
    case X_MOVES: return false;
    case JUMP_TO_MOVE: return action.step % 2 === 0;
    default: return state;
  }
};

const initialHistory = [{ squares: Array(9).fill(null), }];
const history = (state = initialHistory, action) => {
  // Make a copy of current board setup
  const currentHistory = Object.assign({}, state[state.length - 1]);
  const nextSquares = Object.assign({}, currentHistory.squares);

  // Note that properties of action depends on its definition in actions.js
  switch (action.type) {
    case O_MOVES:
      nextSquares[action.id] = 'O';
      state.push({ squares: nextSquares });
      return state;
    case X_MOVES:
      nextSquares[action.id] = 'X';
      state.push({ squares: nextSquares });
      return state;
    case JUMP_TO_MOVE:
      return state.slice(0, action.step + 1);
    default:
      return state;
  }
};

export default combineReducers({
  stepNumber,
  xIsNext,
  history,
});
