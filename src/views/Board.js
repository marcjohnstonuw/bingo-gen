import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class Board extends Component {
  constructor (props) {
    super(props);

    this.state = {
      board: {
        boardSquares: []
      }
    };

    this.toggleBoardSquare = this.toggleBoardSquare.bind(this);
  }
  componentWillMount () {
    axios.get('/boards/' + this.props.routeParams.boardID)
      .then((res) => {
        this.setState({
          board: res.data
        })
      })
      .catch((err) => {
        console.log('dag');
      })
  }

  toggleBoardSquare (id) {
    let squareToUpdate = this.state.board.boardSquares.find((sq) => { return sq.id === id; })
    axios.put('/boardsquares/' + id, {
      dabbed: !squareToUpdate.dabbed
    })
    .then((res) => {
      let newSquares = this.state.board.boardSquares;
      let indexToUpdate = newSquares.findIndex((sq) => { 
        return sq.id === res.data.id 
      })
      newSquares[indexToUpdate].dabbed = !newSquares[indexToUpdate].dabbed;
      this.setState({
        board: {
          boardSquares: newSquares
        }
      });
    })
    .catch((err) => {
      console.error(err)
    })
  }

  
  render() {
    let squares = [];
    this.state.board.boardSquares.forEach((sq, i) => {
      squares.push (
      <div className={'col square'} onClick={() => { this.toggleBoardSquare(sq.id)}}>
        {sq.dabbed ? <div className="dab"></div> : ''}
        <span className={'label'}>{sq.square.text}</span>
      </div>
      )
      if(i % 5 === 4 ? ' offset-sm-1 ' : '') {
        squares.push(<div className="w-100"></div>)
      }
    })
    return (
      <div className="container">
        <div className="row">
          {squares}
        </div>
      </div>
    );
  }
}

export default Board;
