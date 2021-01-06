let turn = 0;
let moves;

$(document).ready(function() {

    document.initView();
    document.board = initBoard();
    drawBoard();

    // TODO: implement on update
    const log = "1. e4 d5 2. e5 e6 3. Nf3 Nc6 4. d4 h6 5. Bb5 Bd7 6. c4 dxc4 7. Bxc4 f6 8. exf6 Qxf6 9. O-O Bd6 10. Nc3 a6 11. Re1 Na5 12. Ne4 Qg6 13. Nh4 Qf7 14. Be2 Bc6 15. Bh5 Bxe4 16. Bxf7+ Kxf7 17. Rxe4 Rd8 18. Qh5+ Ke7 19. Ng6+ Kd7 20. Nxh8 Nf6 21. Qf7+ Be7 22. Ng6 Nxe4 23. Qxe7+ Kc8 24. Qxe6+ Kb8 25. Qxe4 Nc6 26. d5 h5 27. dxc6 Rd1+ 0-1";
    $('#game-log').val(log);
    moves = document.parseMoves(log);

    // const int = setInterval(function() { 
    //     if (++turns > MAX) return delete(int); // turns = 1;
    //     document.board = initBoard();
    //     document.replay($('#game-log').val(), turns);
    //     drawBoard({turn: turns});
    // }, 234)
});



function rpl(delta) { 
    turn += delta;

    if (turn < 0) {
        return turn = 0;
    } 

    if (turn > moves.length* 2) { 
        return turn = moves.length * 2;
    }

    if (delta < 0) { 
        document.board = initBoard();
        document.replay(moves, 0, turn);
    } else if (delta > 0) {
        document.replay(moves, turn-1, 1);
    }

    drawBoard({turn: turn});
}

function logUpdate() { 
    moves = document.parseMoves($('#game-log').val());
    document.board = initBoard();
    turn = 0
    drawBoard();
}