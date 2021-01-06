const pieces = {
    white: {
        pawn: '♙',
        knight: '♘',
        bishop: '♗',
        rook: '♖',
        king: '♔',
        queen: '♕',
        square: "f0f0f0"
    },
    black: {
        pawn: '♟',
        knight: '♞',
        bishop: '♝',
        rook: '♜',
        king: '♚',
        queen: '♛',
        square: "c0c0c0",
    },
    empty: '\xa0'.charAt(0) + '\xa0'.charAt(0) + '\xa0'.charAt(0) + '\xa0'.charAt(0)
}

const FILE = 0;
const ROW = 1;

function initBoard() {

    const emptyRowGen = function () {
        const val = [];

        for (let i = 0; i < 8; i++) {
            val.push(pieces.empty);
        }

        return val;
    }

    return [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'], // black
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        emptyRowGen(),
        emptyRowGen(),
        emptyRowGen(),
        emptyRowGen(),
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'], // white
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],

    ]
};



function pawnReplay(turn) {
    const dir = turn.player == "white" ? 1 : -1;

    if (inspect(turn, 0, -dir)) return;
    if (inspect(turn, 0, -dir * 2)) return;

    if (inspect(turn, 1, -dir)) return;
    if (inspect(turn, -1, -dir)) return;

    //TODO: takes la passoweuro
    // TODO: shapeshift
    throw 'HUY?'
}

function knightReply(turn) {
    // TOOD: implemnt option for ambiguity of which knight to move... 
    // asume stupidity

    const X = 0;
    const Y = 1;
    const dirvect = [
        [-2, -1],
        [-2, 1],
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2]
    ]

    for (let dir of dirvect) {
        if (inspect(turn, dir[X], dir[Y])) return;
    }

    throw 'IHAAA!'
}

function runnersReplayComposer(dirvect) {

    return function (turn) {
        const X = 0;
        const Y = 1;
        for (let dir of dirvect) {
            for (let steps = 1; steps <= 7; steps++) {
                if (inspect(turn, dir[X] * steps, dir[Y] * steps)) return;
            }
        }

        throw 'runnnnerasd'
    }
}

const diagnolasUnitVectors = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1]
];

const straightUnitVectors = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1]
]

const allUnitVecotrs = [
    ...straightUnitVectors,
    ...diagnolasUnitVectors
];


const bishopReplay = runnersReplayComposer(diagnolasUnitVectors);
const rookReplay = runnersReplayComposer(straightUnitVectors);
const queenReplay = runnersReplayComposer(allUnitVecotrs);

function kingReplay(turn) {
    const X = 0;
    const Y = 1;

    for (let dir of allUnitVecotrs) {
        if (inspect(turn, dir[X], dir[Y])) return;
    }

    throw 'kkkkkkkkkkkking'
}


function castleReplay(notation, player) {
    const y = player === "white" ? 7 : 0;
    const side = notation.length > 3 ? "queen" : "king"
    const dir = side === "king" ? 1 : -1;
    const rookXbySides = {
        queen: 0,
        king: 7
    }
    const kingX = 4;

    // king is no longer at his place
    document.board[y][kingX] = pieces.empty;

    // king found better place
    document.board[y][kingX + dir * 2] = pieces[player].king;

    // Rook is no longer at it's place
    document.board[y][rookXbySides[side]] = pieces.empty;

    // rook is guarding the king
    document.board[y][kingX + dir] = pieces[player].rook;
}


function inspect(turn, xDelta, yDelta) {
    const board = document.board;
    const potentialOrigin = turn.square.nav(xDelta, yDelta); // potential

    if (potentialOrigin === null) {
        return false;
    }

    const originPos = potentialOrigin.position;
    const turnPos = turn.square.position;

    if (board[originPos.y][originPos.x] == turn.piece.char) {
        board[originPos.y][originPos.x] = pieces.empty;
        board[turnPos.y][turnPos.x] = turn.piece.char;
        return true;
    }

    return false;
}

document.parseMoves = function (log) {
    return log.split(/\d+\./)
        .slice(1)
        .map(function (turn) {
            return turn.split(/ /).splice(1, 2);
        });
}

/***
 * Note: turn is half a move
 */
document.replay = function (moves, turnsDone = 0, turnsTogo = 1) {

    const flipPlayer = function (player) {
        return player === "white" ? "black" : "white";
    }
    let player = turnsDone % 2 == 0 ? 'white' : 'black';

    for (var ti = 0; ti < turnsTogo; ti++) { // turn index

        const moveIdx = + Math.floor((turnsDone + ti) / 2);
        const playerIdx = player === "white" ? 0 : 1;

        if (!moves[moveIdx]) break;

        const notation = moves[moveIdx][playerIdx];

        const isCastle = notation.indexOf('O-O') !== -1;

        if (isCastle) {
            castleReplay(notation, player)
        } else {
            const turn = new Turn(notation, player);
            switch (turn.piece.name) {
                case 'pawn': pawnReplay(turn);
                    break;
                case 'knight': knightReply(turn);
                    break;
                case 'bishop': bishopReplay(turn);
                    break;
                case 'rook': rookReplay(turn);
                    break;
                case 'queen': queenReplay(turn);
                    break;
                case 'king': kingReplay(turn);
                    break;
            }

        }
        player = flipPlayer(player);
    }
}