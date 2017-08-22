import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GameTypes from './views/GameTypes';
import Board from './views/Board';
import Boards from './views/Boards';
import GameTypeDetails from './views/GameTypeDetails';
import Auth from './Auth/Auth';
import Callback from './Callback/Callback';
import registerServiceWorker from './registerServiceWorker';

const auth = new Auth();

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App} auth={auth}>
            <IndexRoute component={GameTypes} />
            <Route path="gametypes" component={GameTypes} />
            <Route path="gametypes/:gameTypeID" component={GameTypeDetails} />
            <Route path="boards" component={Boards} />
            <Route path="board/:boardID" component={Board} />
            <Route path="callback" component={Callback} auth={auth}/> 
            }}/>
        </Route>
    </Router>
), document.getElementById('root'));
registerServiceWorker();
