var currentPlayer = 'X';
var container = document.querySelector('.container');
var changePlayer = function () {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};
var Box = /** @class */ (function () {
    function Box() {
        var _this = this;
        this.currentValue = '';
        this.changeBoxValue = function () {
            if (_this.currentValue === '') {
                _this.currentValue = currentPlayer;
            }
            return _this.currentValue;
        };
    }
    return Box;
}());
var objArray = [];
var numberOfValuesFilled = function () {
    var count = 0;
    objArray.map(function (objRow) {
        return objRow.map(function (obj) { return (obj.currentValue !== '' ? count++ : null); });
    });
    return count;
};
//1 for win, 2 for draw
var check = function () {
    //check for draw
    if (numberOfValuesFilled() === 9)
        return 2;
    //check for win
    //for all rows
    for (var i = 0; i < 3; i++) {
        var value1 = objArray[i][0].currentValue;
        var value2 = objArray[i][1].currentValue;
        var value3 = objArray[i][2].currentValue;
        if (value1 === value2 && value2 === value3 && value1 !== '')
            return 1;
    }
    //for column
    for (var j = 0; j < 3; j++) {
        var value1 = objArray[0][j].currentValue;
        var value2 = objArray[1][j].currentValue;
        var value3 = objArray[2][j].currentValue;
        if (value1 === value2 && value2 === value3 && value1 !== '')
            return 1;
    }
    //for diagonal
    //for major diagonal
    var majorDiagVal1 = objArray[0][0].currentValue;
    var majorDiagVal2 = objArray[1][1].currentValue;
    var majorDiagVal3 = objArray[2][2].currentValue;
    if (majorDiagVal1 === majorDiagVal2 &&
        majorDiagVal2 === majorDiagVal3 &&
        majorDiagVal1 !== '') {
        return 1;
    }
    //for minor diagonal
    var minorDiagVal1 = objArray[0][2].currentValue;
    var minorDiagVal2 = objArray[1][1].currentValue;
    var minorDiagVal3 = objArray[2][0].currentValue;
    if (minorDiagVal1 === minorDiagVal2 &&
        minorDiagVal2 === minorDiagVal3 &&
        minorDiagVal1 !== '') {
        return 1;
    }
    return 0;
};
var createBoard = function () {
    for (var i = 0; i < 3; i++) {
        var objRow = [];
        var row = document.createElement('div');
        row.classList.add('row');
        var _loop_1 = function (j) {
            var col = document.createElement('div');
            col.classList.add('col', 'd-flex', 'align-items-center', 'justify-content-center');
            col.id = "col" + (i + 1) + (j + 1);
            var obj = new Box();
            objRow.push(obj);
            col.innerHTML = obj.currentValue;
            if (i !== 2)
                col.classList.add('border-bottom', 'border-light');
            if (j !== 2)
                col.classList.add('border-right', 'border-light');
            col.addEventListener('click', function () {
                col.innerText = obj.changeBoxValue();
                var status = check();
                if (status === 1)
                    playerWin.innerHTML = currentPlayer + " won!";
                else if (status === 2)
                    playerWin.innerHTML = 'Game draw!';
                changePlayer();
                changePlayerIndicator();
            });
            row.appendChild(col);
        };
        for (var j = 0; j < 3; j++) {
            _loop_1(j);
        }
        objArray.push(objRow);
        container.appendChild(row);
    }
};
createBoard();
var changePlayerIndicator = function () {
    turnIndicator.innerHTML = currentPlayer + "'s Turn";
};
var turnIndicator = document.createElement('h4');
turnIndicator.innerHTML = currentPlayer + "'s Turn";
document.body.appendChild(turnIndicator);
var playerWin = document.createElement('h4');
document.body.appendChild(playerWin);
var button = document.createElement('button');
button.classList.add('btn', 'btn-light', 'mt-5');
button.innerHTML = 'Reset';
button.addEventListener('click', function () {
    container.innerHTML = '';
    objArray = [];
    createBoard();
    currentPlayer = 'X';
    changePlayerIndicator();
});
document.body.appendChild(button);