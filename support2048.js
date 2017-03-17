/* jshint undef: false, unused: false */

documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i, j) {
    'use strict';
    return i * cellSideLength + (i + 1) * cellSpace;
}

function getPosLeft(i, j) {
    'use strict';
    return j * cellSideLength + (j + 1) * cellSpace;
}

function getNumberBackgroundColor(number) {
    'use strict';
    switch (number) {
        case 2:
            return "#eee";
        case 4:
            return "#673e36";
        case 8:
            return "#d75538";
        case 16:
            return "#56d183";
        case 32:
            return "#3371fa";
        case 64:
            return "#aa4bf4";
        case 128:
            return "#101e63";
        case 256:
            return "##e8e059";
        case 512:
            return "#8b6c42";
        case 1024:
            return "#e63459";
        case 2048:
            return "#1d5243";
        case 4096:
            return "#432950";
        case 8192:
            return "#093d5e";
    }
    return "black";
}

function numberToText(number) {
    'use strict';
    switch (number) {
        case 2:
            return "鼠";
        case 4:
            return "牛";
        case 8:
            return "虎";
        case 16:
            return "兔";
        case 32:
            return "龙";
        case 64:
            return "蛇";
        case 128:
            return "马";
        case 256:
            return "羊";
        case 512:
            return "猴";
        case 1024:
            return "鸡";
        case 2048:
            return "狗";
        case 4096:
            return "猪";
        case 8192:
            return "人";
    }
    return "猫";
}

function getNumberColor(number) {
    'use strict';
    if (number <= 2) {
        return "#776e65";
    }

    return "white";
}

function hasSpace(board) {
    'use strict';
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return true;
            }
        }
    }

    return false;
}

function canMoveLeft(board) {
    'use strict';
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveRight(board) {
    'use strict';
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveUp(board) {
    'use strict';
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
                if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveDown(board) {
    'use strict';
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}


function noBlockHorizontal(row, col1, col2, board) {
    'use strict';
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] !== 0) {
            return false;
        }
    }

    return true;
}

function noBlockVertical(col, row1, row2, board) {
    'use strict';
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] !== 0) {
            return false;
        }
    }

    return true;
}
