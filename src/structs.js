class Square {
    constructor(notation) {

        const x = notation[FILE].charCodeAt(0) - 'a'.charCodeAt(0);
        const y = 8 - notation[ROW];

        if (x > 7 || x < 0) {
            throw 'x :(';
        }
        if (y > 7 || y < 0) throw 'y :(';

        this.notation = notation;
        this.position = {
            x: x,
            y: y
        }
    }
    nav(fileDelta = 0, rowDelta = 0) {
        const file = this.notation[FILE];
        const row = +this.notation[ROW];

        const newRow = row + rowDelta;
        const newFile = String.fromCharCode(file.charCodeAt(0) + fileDelta)

        if (newRow > 8 || newRow < 1) return null;
        if ("abcdefgh".indexOf(newFile) === -1) return null;

        const notation = newFile + newRow;

        return new Square(notation);
    }
}

const toSquare = function (notation) {
    return notation.match(/[a-h][1-8]/)[0];
}

const toPieceName = function (notation) {
    const c = notation[0];
    if (c.toLowerCase() == c) return 'pawn';
    if (c == 'N') return 'knight';
    if (c == 'B') return 'bishop';
    if (c == 'R') return 'rook';
    if (c == 'Q') return 'queen';
    if (c == 'K') return 'king';
    throw 'what ?!';
}

class Turn {
    constructor(notation, player) {
        const pieceName = toPieceName(notation);
        this.notation = notation;
        this.player = player;
        this.piece = {
            name: pieceName,
            char: pieces[player][pieceName],
        };
        this.square = new Square(toSquare(notation))
    }
}