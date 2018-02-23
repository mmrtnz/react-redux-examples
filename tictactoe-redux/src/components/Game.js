// External Dependencies
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'

// Local Dependencies
import Board from './Board';
import {
  jumpTo,
  oMoves,
  xMoves,
} from '../state/actions';

// Component Definition
class Game extends Component {
  constructor(props) {
    super(props);
    this.calculateWinner = this.calculateWinner.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  calculateWinner() {
    const { history } = this.props;

    const squares = history[history.length - 1].squares;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const {
      history,
      onOMoves,
      onXMoves,
      stepNumber,
      xIsNext,
    } = this.props;

    const historyAtStep = history.slice(0, stepNumber + 1);
    const current = historyAtStep[historyAtStep.length - 1];
    const { squares } = current;

    // dispatch tells Redux to update the store and refresh our reducers

    if (this.calculateWinner(squares) || squares[i])
      return;

    if (xIsNext)
      onXMoves(i);
    else
      onOMoves(i);
  }

  render() {
    const {
      history,
      onGoToMoveClick,
      stepNumber,
      xIsNext,
    } = this.props;

    const current = history[stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : 'Go to game start';
      return (
        <li key={move}>
          <RaisedButton onClick={() => onGoToMoveClick(move)} label={desc} />
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
      <MuiThemeProvider>
        <Paper className="game" zDepth={4}>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={this.handleClick}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>
              <ol>{moves}</ol>
            </div>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

// This component uses our entire Redux store which normally doesn't happen for
// larger apps.
const mapStateToProps = state => {
  console.log('state', state);
  return state;
}
 
const mapDispatchToProps = dispatch => ({
  onOMoves: id => { dispatch(oMoves(id)) },
  onXMoves: id => { dispatch(xMoves(id)) },
  onGoToMoveClick: step => { dispatch(jumpTo(step)) },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
