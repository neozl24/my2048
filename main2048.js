var board = new Array();
var score = 0;

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile() {
	if(documentWidth > 500) {
		gridContainerWidth = 460;
		cellSideLength = 90;
		cellSpace = 20;
	}

	$('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
	$('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
	$('#grid-container').css('padding', cellSpace);
	$('#grid-container').css('boarder-radius', 0.02 * gridContainerWidth);

	$('.grid-cell').css('width', cellSideLength);
	$('.grid-cell').css('height', cellSideLength);
	$('.grid-cell').css('boarder-radius', 0.02 * gridContainerWidth);
}

function newgame() {
	//initialize the grid container
	init();
	//generate two grids that each contains one number 2 or 4
	generateOneNumber();
	generateOneNumber();
}

function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		for (var j = 0; j < 4; j++)
			board[i][j] = 0;
	}

	updateBoardView();

	score = 0;
}

function updateBoardView() {
	$(".number-cell").remove();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $("#number-cell-"+i+"-"+j);

			if (board[i][j] == 0) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', getPosTop(i,j) + 0.5*cellSideLength);
				theNumberCell.css('left', getPosLeft(i,j) + 0.5*cellSideLength);
			}
			else {
				theNumberCell.css('width', cellSideLength);
				theNumberCell.css('height', cellSideLength);
				theNumberCell.css('top', getPosTop(i,j));
				theNumberCell.css('left', getPosLeft(i,j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]) );
				theNumberCell.css('color', getNumberColor(board[i][j]) );
				theNumberCell.text(numberToText(board[i][j]));
				
				// if(board[i][j] >= 100)
				// 	theNumberCell.css('font-size', 50);
				// else if(board[i][j] >= 1000)
				// 	theNumberCell.css('font-size', 40);
			}
		}
	}
	$('.number-cell').css('line-height', cellSideLength +'px');
	$('.number-cell').css('font-size', 0.6*cellSideLength +'px');
}

function updateScore(score) {
	$("#score").text(score);
	// slideEffect(score);
}

function generateOneNumber() {
	if(!hasSpace(board))
		return false;

	// var randx = parseInt( Math.floor(Math.random() * 4) );
	// var randy = parseInt( Math.floor(Math.random() * 4) );

	// while(true) {
	// 	if (board[randx][randy] == 0)
	// 		break;
	// 	randx = parseInt( Math.floor(Math.random() * 4) );
	// 	randy = parseInt( Math.floor(Math.random() * 4) );
	// }
	
	var emptyGrids = new Array();

	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 4; j++)
			if(board[i][j] == 0)
				emptyGrids.push([i, j]);

	var randGrid = emptyGrids[ Math.floor(Math.random() * emptyGrids.length) ];
	var randx = randGrid[0];
	var randy = randGrid[1];

	var randNumber = Math.random() < 0.75 ? 2 : 4;

	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);

	return true
}


$(document).keydown(function(event){
	switch(event.keyCode) {
		case 37: //left
			event.preventDefault();
			if (moveLeft()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 38: //up
			event.preventDefault();
			if (moveUp()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 39: //right
			event.preventDefault();
			if (moveRight()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 40: //down
			event.preventDefault();
			if (moveDown()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		default: //default
			break;
	}
});

document.addEventListener('touchstart', function(event){
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
});

document.addEventListener('touchmove', function(event){
	event.preventDefault();
});

document.addEventListener('touchend', function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	distanceX = Math.abs(endX - startX );
	distanceY = Math.abs(endY - startY );

	if(distanceX < 0.15 * documentWidth && distanceY < 0.15 * documentWidth)
		return ;

	if(distanceX >= distanceY) {
		if(endX < startX) {
			if(moveLeft()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
		else if(endX > startX) {
			if(moveRight()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
	}
	else if(distanceY > distanceX) {
		if(endY < startY) {
			if(moveUp()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
		else if(endY > startY) {
			if(moveDown()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isGameOver()", 300);
			}
		}
	}
});

function isGameOver() {
	if (hasSpace(board) == false &&
		canMoveLeft(board) == false &&
		canMoveRight(board) == false &&
		canMoveUp(board) == false &&
		canMoveDown(board) == false )
		alert('Game Over!');
}

function moveLeft() {
	if(!canMoveLeft(board))
		return false;
	for(var i = 0; i < 4; i++) {
		var AlreadyAdded = -1;
		for(var j = 0; j < 4; j++)
			if(board[i][j] != 0) {
				for(var k = AlreadyAdded + 1; k < j; k ++)
					if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board) ) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if (board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) ) {
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						AlreadyAdded = k;

						score += board[i][k];
						updateScore(score);
						continue;
					}
			}	
	}			

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveRight() {
	if(!canMoveRight(board))
		return false;
	for(var i = 0; i < 4; i++) {
		var AlreadyAdded = 4;
		for(var j = 3; j >= 0; j--)
			if(board[i][j] != 0) {
				for(var k = AlreadyAdded - 1; k > j; k--)
					if (board[i][k] == 0 && noBlockHorizontal(i,j,k,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if (board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						AlreadyAdded = k;

						score += board[i][k];
						updateScore(score);
						continue;
					}
			}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveUp() {
	if(!canMoveUp(board))
		return false;
	for(var j = 0; j < 4; j++) {
		var AlreadyAdded = -1;
		for(var i = 0; i < 4; i++)
			if(board[i][j] != 0) {
				for(var k = AlreadyAdded + 1; k < i; k++)
					if (board[k][j] == 0 && noBlockVertical(j,k,i,board) ) {
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if (board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) ) {
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						AlreadyAdded = k;

						score += board[i][k];
						updateScore(score);
						continue;
					}
			}
	}				

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveDown() {
	if(!canMoveDown(board))
		return false;
	for(var j = 0; j < 4; j++) {
		var AlreadyAdded = 4;
		for(var i = 3; i >= 0; i--)
			if(board[i][j] != 0) {
				for(var k = AlreadyAdded - 1; k > i; k--)
					if (board[k][j] == 0 && noBlockVertical(j,i,k,board) ) {
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if (board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) ) {
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						AlreadyAdded = k;

						score += board[i][k];
						updateScore(score);
						continue;
					}
			}
	}				

	setTimeout("updateBoardView()", 200);
	return true;
}