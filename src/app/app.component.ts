import { Component } from '@angular/core';
import {GameService} from "./Core/Game.Service";
import {Case} from "./Core/Case";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Morpion';
  cases: Case[] = [];
  isGameOver = false;
  gameResult = '';
  turn: number;
  scoreJ1 = 0;
  scoreJ2 = 0;

  constructor(private gameService: GameService) {
    this.cases = this.gameService.cases;
    this.turn = this.gameService.turn;
  }

  restartGame() {
    this.gameService.initGame();
    this.cases = this.gameService.cases;
    this.isGameOver = false;
    this.turn = 0;
  }

  playerClick(i: number) {
    if(this.gameService.turn === 0) {
      this.play(i);
    }
  }

  gameOver() {
    this.isGameOver = true;
    this.gameResult = this.gameService.getResults();
  }

  play(i:number) {

    if(this.gameService.cases[i].value === '' && !this.isGameOver) {

      this.gameService.nbEmptyCases -= 1;

      if(this.gameService.turn === 0) {
        this.gameService.cases[i].setValue('C');
      } else {
        this.gameService.cases[i].setValue('R');
      }

      if (this.gameService.isGameWin()) {
        this.gameOver();
        return;
      } else {
        if(this.gameService.nbEmptyCases === 0) {
          this.gameService.draw = true;
          this.gameOver();
          return;
        } else {
          this.turn = this.gameService.playerChange();
          if (this.gameService.turn === 1) {
            this.computerTurn();
          }
        }
      }
    } else {
      return;
    }
  }


  private computerTurn() {
    const move = this.gameService.computerMove() -1;

    if(this.gameService.cases[move].value === '') {

      setTimeout(() => {
        this.play(move);
      }, 500);
    } else {
      this.computerTurn();
    }
  }
}
