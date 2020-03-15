import React, {Component} from 'react';
import Line from './Line'
import CheckWinner from './CheckWinner'

class Board extends Component {

  constructor() {
    super();
    this.state = {
      boardState: new Array(7).fill(new Array(6).fill(null)),
      playerTurn: 'Red',
      gameMode: '',
      gameSelected: false,
      winner: ''
    }
  }
  
  selectedGame(mode){
      this.setState({
         gameMode: mode,
         gameSelected: true, 
         boardState: new Array(7).fill(new Array(6).fill(null))
      })
  }
  
  makeMove(lineID){
      const boardCopy = this.state.boardState.map(function(arr) {
        return arr.slice();
      });
      if( boardCopy[lineID].indexOf(null) !== -1 ){
        let newLine = boardCopy[lineID].reverse()
        newLine[newLine.indexOf(null)] = this.state.playerTurn
        newLine.reverse()
        this.setState({
          playerTurn: (this.state.playerTurn === 'Red') ? 'Blue' : 'Red',
          boardState: boardCopy
        })
      }
  }
  
  /*if winner does not exist*/
  handleClick(lineID) {
      if(this.state.winner === ''){
        this.makeMove(lineID)
      }
  }
    
  /*check if the winner is in AI mode and then make a move*/
  componentDidUpdate(){
      let winner = CheckWinner(this.state.boardState)
      if(this.state.winner !== winner){
        this.setState({winner: winner})
      } else {
         if(this.state.gameMode === 'ai' && this.state.playerTurn === 'Blue'){
          let validMove = -1;
          while(validMove === -1){
            let line = Math.floor((Math.random() * 7))
            if(this.state.boardState[line].indexOf(null) !== -1){
              validMove = line
            }else{
              validMove = -1
            }
          }
          this.makeMove(validMove)
         }
      }
  }
  
  render(){
  
    /*display winner message if there is a winner */
    let winnerMessageStyle
    if(this.state.winner !== ""){
      winnerMessageStyle = "winnerMessage appear"
    }else {
      winnerMessageStyle = "winnerMessage"
    }
  
    /*Construct lines based on number of number of cells from board*/
    let lines = [...Array(this.state.boardState.length)].map((x, i) => 
      <Line
          key={i}
          cells={this.state.boardState[i]}
          handleClick={() => this.handleClick(i)}
      ></Line>
    )
  
    return (
      <div>
        {this.state.gameSelected &&
          <div className="Board">
            {lines}
          </div>
        }
        <div className={winnerMessageStyle}>{this.state.winner}</div>
        {(!this.state.gameSelected || this.state.winner !== '') &&
          <div>
            <button onClick={() => this.selectedGame('human')}>Play Human</button>
            <button onClick={() => this.selectedGame('ai')}>Play AI</button>
          </div>
        }
      </div>
    )
  }
}

export default Board;
