import React, { Component } from 'react';

class GameType extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isEditing: props.data.text ? false : true,
            newText: props.data.text
        };
    }
    onSave () {
        this.setState({
            isEditing: false
        })
        this.props.onSave(this.props.data.id, this.state.newText);
    }
    render () {
        return (
            <div>
                {this.state.isEditing ? 
                    <input onChange={(ev) => this.setState({newText: ev.target.value})} 
                        value={this.state.newText} /> :
                    this.props.data.text
                }
                {this.state.isEditing ?
                    <button onClick={() => this.onSave() }>Save</button> : 
                    <button onClick={() => this.setState({isEditing: true})}>Edit</button>
                }
                
            </div>
        )
    }
}

export default GameType;