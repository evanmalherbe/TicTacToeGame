﻿let currentPlayer = 1;

$(document).ready(async function () {
   // drawBoard();
});

function isEmpty(element) {
    // Is element empty (ignore invisible elements such as spaces and line breaks)
    return !$.trim(element.html());
}

function clearBoard() {
    for (let i = 0; i < 9; i++) {
        $(`#block-${i}`).empty();
        $(`#block-${i}`).removeAttr('data-game-piece');
    }
    $("#winning-msg").remove();
}

function insertGamePiece(id) {
    let cross = '<i class="fa-solid fa-xmark huge-icon" style="color: #000000;"></i>';
    let circle = '<i class="fa-regular fa-circle less-huge-icon" style="color: #ff0000;"></i>';
    let whichIcon = currentPlayer === 1 ? cross : circle;
    let dataValue = currentPlayer === 1 ? "cross" : "circle";

    if (isEmpty($(`#${id}`))) {
        $(`#${id}`).append(whichIcon);
        $(`#${id}`).attr('data-game-piece', dataValue);

        currentPlayer = currentPlayer === 1 ? 2 : 1;
        checkForWinner();
    }
}

function checkForWinner() {
    let boardArray = [];

    // Add state of all board positions to array
    for (let i = 0; i < 9; i++) {
        let hasDataAttr = $(`#block-${i}`).attr('data-game-piece') !== undefined;

        if (hasDataAttr) {
            let contentsOfBlock = $(`#block-${i}`).attr('data-game-piece');
            boardArray.push(contentsOfBlock);
        }
        else {
            boardArray.push(null);
        }
    }

    // All possible winning conditions
    let winningConditionsArray = [
        [0, 1, 2], // horizontal
        [3, 4, 5], // horizontal
        [6, 7, 8], // horizontal
        [0, 3, 6], // vertical
        [1, 4, 7], // vertical
        [2, 5, 8], // vertical
        [0, 4, 8], // diagonal
        [2, 4, 6] // diagonal
    ];

    // Check board against winning conditions array
    winningConditionsArray.some((condition, index) => {
        if (boardArray[condition[0]] === boardArray[condition[1]]
            && boardArray[condition[1]] === boardArray[condition[2]]
            && boardArray[condition[0]] !== null) {
            youWon(boardArray[condition[0]]);
            return true;
        }
    });
}

function youWon(pieceType) {
    let type = pieceType === "cross" ? "Crosses" : "Circles";
    let winningMessage = `<div id="winning-msg" class="winning-message">${type} won!</div>`;
    $("#mainBoard").prepend(winningMessage);
    setTimeout(() => {
        $("#winning-msg").css('opacity', 1); // Fade in the winning message
    }, 10);
}

function changeBorder(blockId) {
    // if already has red border
    if ($(`#${blockId}`).hasClass('redBorder')) {
        if (!$(`#${blockId}`).hasClass('border')) {
            $(`#${blockId}`).addClass('border')
        }
        $(`#${blockId}`).removeClass("redBorder");
    }
    else {
        // does not yet have red border
        $(".block").removeClass("redBorder").removeClass("border");
        $(".block").addClass("border");

        if ($(`#${blockId}`).hasClass('border')) {
            $(`#${blockId}`).removeClass("border");
        }
        $(`#${blockId}`).addClass("redBorder");
    }
}

function drawBoard() {
    let blockArray = [];

    for (let i = 0; i < 9; i++) {
        let block = `<div
            class="col-4 border block blockHeight d-flex justify-content-center align-items-center"
            id="block-${i}"
            onClick="insertGamePiece('block-${i}')"></div>`;
        blockArray.push(block);
    }

    $("#mainBoard").append(blockArray.join(""));
}