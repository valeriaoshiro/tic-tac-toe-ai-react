class TTT {
    constructor() {
        this.turn = 'X';
        this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.message = '';
    }
    
}

TTT.prototype.availableSpots = function(newBoard) {
  return newBoard.filter(i => i !== 'X' && i !== 'O');
}

TTT.prototype.winningComb = function(newBoard, newTurn) {
    return (
        this.horizontalTop(newBoard, newTurn) ||
        this.horizontalMiddle(newBoard, newTurn) ||
        this.horizontalBottom(newBoard, newTurn) ||
        this.verticalLeft(newBoard, newTurn) ||
        this.verticalMiddle(newBoard, newTurn) ||
        this.verticalRight(newBoard, newTurn) ||
        this.diagonal1(newBoard, newTurn) ||
        this.diagonal2(newBoard, newTurn)) ? true : false;
}

TTT.prototype.horizontalTop = function(newBoard, newTurn) {
    return newBoard[0] === newBoard[1] && newBoard[0] === newBoard[2] && newBoard[0] === newTurn ? true : false;
}

TTT.prototype.horizontalMiddle = function(newBoard, newTurn) {
    return newBoard[3] === newBoard[4] && newBoard[3] === newBoard[5] && newBoard[3] === newTurn ? true : false;
}

TTT.prototype.horizontalBottom = function(newBoard, newTurn) {
    return newBoard[6] === newBoard[7] && newBoard[6] === newBoard[8] && newBoard[6] === newTurn ? true : false;
}

TTT.prototype.verticalLeft = function(newBoard, newTurn) {
    return newBoard[0] === newBoard[3] && newBoard[0] === newBoard[6] && newBoard[0] === newTurn ? true : false;
}

TTT.prototype.verticalMiddle = function(newBoard, newTurn) {
    return newBoard[1] === newBoard[4] && newBoard[1] === newBoard[7] && newBoard[1] === newTurn ? true : false;
}

TTT.prototype.verticalRight = function(newBoard, newTurn) {
    return newBoard[2] === newBoard[5] && newBoard[2] === newBoard[8] && newBoard[2] === newTurn ? true : false;
}

TTT.prototype.diagonal1 = function(newBoard, newTurn) {
    return newBoard[0] === newBoard[4] && newBoard[0] === newBoard[8] && newBoard[0] === newTurn ? true : false;
}

TTT.prototype.diagonal2 = function(newBoard, newTurn) {
    return newBoard[2] === newBoard[4] && newBoard[2] === newBoard[6] && newBoard[2] === newTurn ? true : false;
}

TTT.prototype.updateTurn = function(newBoard, newTurn) {
    if (this.winningComb(newBoard, newTurn)) {
        let message = newTurn === 'O' ? 'You lost' : 'You won';
        return [newTurn, newBoard, message];
    } else if (!this.winningComb(newBoard, newTurn) && this.availableSpots(newBoard).length === 0) {
        let message = 'It\'s a tie';
        return [newTurn, newBoard, message];
    } else {
        return newTurn === 'O' ? ['X', newBoard, ''] : ['O', newBoard, ''];
    }
}

export default TTT;