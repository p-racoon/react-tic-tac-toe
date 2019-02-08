import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     render() {
//         return (
//             //   Remember: writing onClick= {alert("click")} would fire an alert everytime the button is re-rendered 
//             <button className="square"
//                 onClick={()=>this.props.onClick()}>
//                 {/* Here the value is printed  */}
//                 {this.props.value}
//             </button>
//         );
//     }
// }

//below is the Equivalent Square component but implemented via Function, and hnce called as Function Component
// one disadvantage of a functional component is that it does not support use of states
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {/* When we modified the Square to be a function component, we also changed onClick={() => this.props.onClick()} to a shorter onClick={props.onClick} (note the lack of parentheses on both sides). In a class, we used an arrow function to access the correct this value, but in a function component we don’t need to worry about this. */}
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }

    }
    renderSquare(i) {
        // Data 'i' is passed as 'value' 
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }
    handleClick(i) {
        // for objects we can use:
        // var player = {score: 1, name: 'Jeff'};
        // var newPlayer = Object.assign({}, player, {score: 2});
        // we do so because in React we keep the Functions as immutable
        //Immutabiltiy helps in keepin track of the previous versions by keeping the data intact
        // Detecting changes in immutable objects is considerably easier.
        // If the immutable object that is being referenced is different than the previous one, then the object has changed. 
        // The main benefit of immutability is that it helps you build pure components in React. 
        // Immutable data can easily determine if changes have been made which helps to determine when a component requires re-rendering.
        const squares = this.state.squares.slice();// creates copy of the squares array
        
        if (calculateWinner(squares) || squares[i]) { // return early by ignoring a click if someone has won the game or if a Square is already filled
            return;
          } 
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });

    }
    render() {
        //change nextPlayer display line
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

//helper function to calculate Winner
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            //just comparing if the value matches any of the winning combinations, if it does function returns the winner
            return squares[a];
        }
    }
    return null;
}