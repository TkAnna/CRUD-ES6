'use strict';

document.getElementById('showBtn').onclick = function() {
    document.getElementById('showBtnArea').style.display = 'none';
    let myTable = new Table();
    myTable.generateTable();
};
