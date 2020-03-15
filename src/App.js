import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Connect Four</h2>
        </div>
        <div className="Game">
          <Board></Board>
        </div>
      </div>
    );
  }
}



export default App;
