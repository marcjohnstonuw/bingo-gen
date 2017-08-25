import React, { Component } from 'react';

class Callback extends Component {
    componentDidMount () {
        this.props.auth.handleAuthentication(this.props.getProfile);
    }
    render() {
        console.log('called back')

        return (
            <div>boring...
            </div>
        );
    }
}

export default Callback;