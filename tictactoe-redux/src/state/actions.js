// Local Dependencies
import {
  JUMP_TO_MOVE,
  O_MOVES,
  X_MOVES,
} from './action-types';

// Action Creators:
// These functions return action objects. Actions tell Redux about the type of
// activity in our app.
export const xMoves = id => ({
  type: X_MOVES,
  id,
});

export const oMoves = id => ({
  type: O_MOVES,
  id,
});

export const jumpTo = step => ({
  type: JUMP_TO_MOVE,
  step,
});
