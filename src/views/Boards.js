import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import '../App.css';

class Boards extends Component {
  constructor (props) {
    super(props);

    this.state = {
      boards: [],
    };
  }
  componentWillMount () {
    axios.get('/boards')
      .then((res) => {
        this.setState({
          boards: res.data
        })
      })
      .catch((err) => {
        console.log('dag');
      })
  }
  render() {
    let countDabbed = (acc, sq) => { return acc + (sq.dabbed ? 1 : 0) }
    let boards = this.state.boards.map((b) => {
      return (
        <Link to={"board/" + b.id}>
          <div className="board-link row">
            <div className="col-sm-4">{b.gameType.name}</div>
            <div className="col-sm-4">description</div>
            <div className="col-sm-4">{b.boardSquares.reduce(countDabbed, 0)}</div>
          </div>
        </Link>
      )
    })
    return (
      <div>
        {boards}
      </div>
    );
  }
}

export default Boards;
