import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Square from '../components/Square'

class GameTypeDetails extends Component {
  constructor (props) {
    super(props);

    this.state = {
      newSquare: '',
      gameTypeData: {
        squares: []
      }
    };

    this.onSquareSave = this.onSquareSave.bind(this)
  }
  componentWillMount () {
    axios.get('/gameTypes/' + this.props.routeParams.gameTypeID)
    .then((res) => {
      this.setState({
        gameTypeData: Object.assign({}, res.data)
      })
    });
  }
  onSquareSave (index, newText) {
    let updatedSquare = this.state.gameTypeData.squares.find((sq) => {return sq.id === index});
    axios.put('/squares/' + updatedSquare.id, {
      text: newText
    }).then((res) => {
      let newSquares = this.state.gameTypeData.squares;
      let indexToUpdate = newSquares.findIndex((sq) => { 
        return sq.id === res.data.id 
      })
      newSquares[indexToUpdate].text = res.data.text
      let newState = this.state;
      newState.gameTypeData.squares = newSquares
      this.setState(newState);
    })
  }
  addNewSquare (ev) {
    ev.preventDefault();
    if (this.state.newSquare) {
      axios.post('/squares/' + this.state.gameTypeData.id, {
        text: this.state.newSquare
      })
      .then((res) => {
        let newState = this.state;
        let newSquares = this.state.gameTypeData.squares;
        newSquares.push(res.data);
        newState.newSquare = '';
        newState.gameTypeData.squares = newSquares;
        this.setState(newState);
      })
    }
  }
  getNewBoard () {
    axios.post('/boards/' + this.state.gameTypeData.id)
    .then((res) => {
      browserHistory.push('/board/' + res.data.id)
    })
  }
  render() {
    let squares = this.state.gameTypeData.squares.map((sq) => {
      return (
        <Square onSave={this.onSquareSave} data={sq}></Square>
      )
    })
    return (
      <div>
        <button onClick={() => this.getNewBoard()}>New Board</button>
        <hr />
        {squares}
        <hr />
        <form onSubmit={(ev) => this.addNewSquare(ev)}>
        <input onChange={(ev) => this.setState({newSquare: ev.target.value})}
              value={this.state.newSquare} />
        <button type="submit">Add New</button>
        </form>
      </div>
    );
  }
}

export default GameTypeDetails;
