import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {Link} from 'react-router';
import axios from 'axios';
import '../App.css';

class GameType extends Component {
  constructor (props) {
    super(props);

    this.state = {
      newGameType: '',
      gameTypes: []
    };
  }
  componentWillMount () {
    axios.get('/gameTypes/')
    .then((res) => {
      this.setState({
        gameTypes: res.data
      })
    });
  }
  addNewGame () {
    axios.post('/gameTypes/', {
      name: this.state.newGameType
    })
    .then((res) => {
      browserHistory.push('/gameTypes/' + res.data.id)
    })
  }
  render() {
    let gameTypes = this.state.gameTypes.map((gt) => {
      return (
        <Link to={'/gameTypes/' + gt.id}><div>{gt.name}</div></Link>
      )
    })
    return (
      <div>
        {gameTypes}
        <hr />
        <input value={this.state.newGameType}
              onChange={(ev) => this.setState({newGameType: ev.target.value})} />
        <button onClick={() => this.addNewGame() }>Add New Game</button>
      </div>
    );
  }
}

export default GameType;
