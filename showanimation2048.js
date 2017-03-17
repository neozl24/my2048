/* jshint undef: false, unused: false */

function showNumberWithAnimation(i, j, number) {
    'use strict';
    var numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.css('background-color', getNumberBackgroundColor(number));
    numberCell.css('color', getNumberColor(number));
    numberCell.text(numberToText(number));

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);

}

function showMoveAnimation(fromx, fromy, tox, toy) {
    'use strict';
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

// function slideEffect(score) {
// 	$("#score").effect('slide');
// }
