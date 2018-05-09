class TTT {
    constructor() {
        this.turn = 'X';
        this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.message = '';
    }
    
    // availableSpots(newBoard) {
    //     return newBoard.filter(i => i !== 'X' && i !== 'O');
    // }
}

TTT.prototype.availableSpots = function(newBoard) {
  return newBoard.filter(i => i !== 'X' && i !== 'O');
}

export default TTT;