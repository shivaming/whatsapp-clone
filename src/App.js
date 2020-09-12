import React from 'react';
import './App.css';
import Sidebar from "./Sidebar"
import Chat from './Chat'
import Login from './Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateProviderValue } from './StateProvider';


function App() {
const [ user,] = useStateProviderValue();


  return (
    <div className="app">
       {!user ? (
        <Login />
      ) : (
    <div className="app__body">
      <Router>
      <Sidebar />
        <Switch>
          <Route path="/rooms/:roomId">
          <Chat />
          </Route>
          <Route path="/">
            <Chat />
          </Route>
        </Switch>
      </Router>
    
    </div> 
      )}
    </div>
);
}

export default App;