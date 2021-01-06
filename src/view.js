

function drawBoard(metadata) {
    let html = "";
    
    if (metadata) { 
        const metakeys = Object.keys(metadata);
        for(let metakey of metakeys) {
            html += "<span><b>" + metakey + ":</b>"+metadata[metakey]+"</span>";
        }
    }
    
    for (let i = 0; i < 8; i++) {
        html += "<div class=\"row font\" style='border:2px solid #dde'>";
        for (let j = 0; j < 8; j++) {
            const row = 8 - i;
            const file = String.fromCharCode('a'.charCodeAt(0) + j);
            const isWhite = (i + j) % 2 == 0;
            const color = isWhite ? pieces.white.square : pieces.black.square;
            const colorHtml = "style='background-color:#" + color + "'";
            const piece = document.board[i][j]; //  ? board[i][j] : ' ';
            html += "<span id=\"" + file + row + "\" " + colorHtml + ">" + piece + "</span>"
        }
        html += "</div>"
    }

    document.getElementById("board").innerHTML = html;
}

document.initView = function () {
    $('#left-arrow').html('<span onclick="rpl(-1)"><b>&#8592;</b></span>')
    $('#right-arrow').html('<span onclick="rpl(+1)"><b>&#8594;</b></span>')
}



