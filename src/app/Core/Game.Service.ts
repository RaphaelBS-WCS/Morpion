import {Player} from "./Player";
import {Case} from "./Case";

export class GameService {

  j1: Player;
  j2: Player;
  cases : Case[];
  nbEmptyCases: number;
  turn: number;
  draw = false;



  constructor() {
    this.initGame();
  }

  initGame() {
    this.nbEmptyCases = 9;
    this.turn = 0;
    this.draw = false;

    // Starting cases creation
    this.cases = [];

    for (let i = 0; i < 9; i++) {
      const newCase = new Case();
      newCase.setValue('');
      this.cases.push(newCase);
    }

    // Starting players initialisation
    this.j1 = new Player();

    // 2nd player will be an IA
    this.j2 = new Player();
    this.j2.computer = true;

  }

  getResults() {
    if(this.draw) {
      return "it's a draw!"
    } else {
      if(this.turn === 0) {
        return "Win!"
      } else {
        return "Lost :-(";
      }
    }
  }

  playerChange(): number {
    if(this.turn === 0) {
      this.turn = 1;
      return 1;
    } else {
      this.turn = 0;
      return 0;
    }
  }

  // Win conditions
  isGameWin() {
    // Cases
    const c1 = this.cases[0].value;
    const c2 = this.cases[1].value;
    const c3 = this.cases[2].value;
    const c4 = this.cases[3].value;
    const c5 = this.cases[4].value;
    const c6 = this.cases[5].value;
    const c7 = this.cases[6].value;
    const c8 = this.cases[7].value;
    const c9 = this.cases[8].value;

    // Conditions
    const cond1 = c1 && c2 && c3 && (c1 === c2 && c2 === c3);
    const cond2 = c4 && c5 && c6 && (c4 === c5 && c5 === c6);
    const cond3 = c7 && c8 && c9 && (c7 === c8 && c8 === c9);
    const cond4 = c1 && c4 && c7 && (c1 === c4 && c4 === c7);
    const cond5 = c2 && c5 && c8 && (c2 === c5 && c5 === c8);
    const cond6 = c3 && c6 && c9 && (c3 === c6 && c6 === c9);
    const cond7 = c1 && c5 && c9 && (c1 === c5 && c5 === c9);
    const cond8 = c3 && c5 && c7 && (c3 === c5 && c5 === c7);


    if (cond1 || cond2 || cond3 || cond4 || cond5 || cond6 || cond7 || cond8) {
      return true;
    } else {
      return false;
    }
  }

  // IA Moves
  computerMove(): number {
    let move: number = this.getNextPlayWin('R');

    if (move === 0) {
      move = this.blockPlayerWin();
    }

    if (move === 0) {
      move = Math.floor(Math.random() * 8) + 1;
    }

    return move;
  }

  private blockPlayerWin(): number {
    const c1 = this.cases[0].value;
    const c2 = this.cases[1].value;
    const c3 = this.cases[2].value;
    const c4 = this.cases[3].value;
    const c5 = this.cases[4].value;
    const c6 = this.cases[5].value;
    const c7 = this.cases[6].value;
    const c8 = this.cases[7].value;
    const c9 = this.cases[8].value;

    if (c1 && c2 && !c3 && (c1 === c2)) {
      return 3;
    }
    if (!c1 && c2 && c3 && (c2 === c3)) {
      return 1;
    }
    if (c1 && !c2 && c3 && (c1 === c3)) {
      return 2;
    }

    if (c4 && c5 && !c6 && (c4 === c5)) {
      return 6;
    }
    if (!c4 && c5 && c6 && (c5 === c6)) {
      return 4;
    }
    if (c4 && !c5 && c6 && (c4 === c6)) {
      return 5;
    }

    if (c7 && c8 && !c9 && (c7 === c8)) {
      return 9;
    }
    if (!c7 && c8 && c9 && (c8 === c9)) {
      return 7;
    }
    if (c7 && !c8 && c9 && (c7 === c9)) {
      return 8;
    }

    if (c1 && c4 && !c7 && (c1 === c4)) {
      return 7;
    }
    if (!c1 && c4 && c7 && (c4 === c7)) {
      return 1;
    }
    if (c1 && !c4 && c7 && (c1 === c7)) {
      return 4;
    }

    if (c2 && c5 && !c8 && (c2 === c5)) {
      return 8;
    }
    if (!c2 && c5 && c8 && (c5 === c8)) {
      return 2;
    }
    if (c2 && !c5 && c8 && (c2 === c8)) {
      return 5;
    }

    if (c3 && c6 && !c9 && (c3 === c6)) {
      return 9;
    }
    if (!c3 && c6 && c9 && (c6 === c9)) {
      return 3;
    }
    if (c3 && !c6 && c9 && (c3 === c9)) {
      return 6;
    }

    if (c1 && c5 && !c9 && (c1 === c5)) {
      return 9;
    }
    if (!c1 && c5 && c9 && (c5 === c9)) {
      return 1;
    }
    if (c1 && !c5 && c9 && (c1 === c9)) {
      return 5;
    }

    if (c3 && c5 && !c7 && (c3 === c5)) {
      return 7;
    }
    if (!c3 && c5 && c7 && (c5 === c7)) {
      return 3;
    }
    if (c3 && !c5 && c7 && (c3 === c7)) {
      return 5;
    }

    return 0;
  }

  private getNextPlayWin(r: string): number {

    const c1 = this.cases[0].value;
    const c2 = this.cases[1].value;
    const c3 = this.cases[2].value;
    const c4 = this.cases[3].value;
    const c5 = this.cases[4].value;
    const c6 = this.cases[5].value;
    const c7 = this.cases[6].value;
    const c8 = this.cases[7].value;
    const c9 = this.cases[8].value;

    let p;

    if (c1 && c2 && !c3 && (c1 === c2 && c2 === p)) {
      return 3;
    }
    if (!c1 && c2 && c3 && (c2 === c3 && c3 === p)) {
      return 1;
    }
    if (c1 && !c2 && c3 && (c1 === c3 && c3 === p)) {
      return 2;
    }

    if (c4 && c5 && !c6 && (c4 === c5 && c5 === p)) {
      return 6;
    }
    if (!c4 && c5 && c6 && (c5 === c6 && c6 === p)) {
      return 4;
    }
    if (c4 && !c5 && c6 && (c4 === c6 && c6 === p)) {
      return 5;
    }

    if (c7 && c8 && !c9 && (c7 === c8 && c8 === p)) {
      return 9;
    }
    if (!c7 && c8 && c9 && (c8 === c9 && c9 === p)) {
      return 7;
    }
    if (c7 && !c8 && c9 && (c7 === c9 && c9 === p)) {
      return 8;
    }

    if (c1 && c4 && !c7 && (c1 === c4 && c4 === p)) {
      return 7;
    }
    if (!c1 && c4 && c7 && (c4 === c7 && c7 === p)) {
      return 1;
    }
    if (c1 && !c4 && c7 && (c1 === c7 && c7 === p)) {
      return 4;
    }

    if (c2 && c5 && !c8 && (c2 === c5 && c5 === p)) {
      return 8;
    }
    if (!c2 && c5 && c8 && (c5 === c8 && c8 === p)) {
      return 2;
    }
    if (c2 && !c5 && c8 && (c2 === c8 && c8 === p)) {
      return 5;
    }

    if (c3 && c6 && !c9 && (c3 === c6 && c6 === p)) {
      return 9;
    }
    if (!c3 && c6 && c9 && (c6 === c9 && c9 === p)) {
      return 3;
    }
    if (c3 && !c6 && c9 && (c3 === c9 && c9 === p)) {
      return 6;
    }

    if (c1 && c5 && !c9 && (c1 === c5 && c5 === p)) {
      return 9;
    }
    if (!c1 && c5 && c9 && (c5 === c9 && c9 === p)) {
      return 1;
    }
    if (c1 && !c5 && c9 && (c1 === c9 && c9 === p)) {
      return 5;
    }

    if (c3 && c5 && !c7 && (c3 === c5 && c5 === p)) {
      return 7;
    }
    if (!c3 && c5 && c7 && (c5 === c7 && c7 === p)) {
      return 3;
    }
    if (c3 && !c5 && c7 && (c3 === c7 && c7 === p)) {
      return 5;
    }

    return 0;
  }
}
