'use strict';
initGame();

const button = document.querySelector('.button');
const win = document.querySelector('.win');
const text = document.querySelector('.win__player');
const winText = document.querySelector('.win__text')
let count = 0;
let countZero = 0;

function initGame() {
  const section = document.querySelector('.tictac__wrapper');
  const myField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  drawField(myField, section);

  let currentPlayer = 1;

  section.addEventListener('click', event => {
    const selectedCell = event.target.closest('.cell');

    if (!selectedCell) {
      return;
    }

    const x = selectedCell.dataset.x;
    const o = selectedCell.dataset.y;

    if (currentPlayer === 1) {
      if (myField[x][o] !== 0) {
        return;
      } else {
        myField[x][o] = currentPlayer;
      }
      selectedCell.innerHTML = `<span class="tic"></span>`;
      isWin(myField, currentPlayer);
      currentPlayer = 2;
    } else if (currentPlayer === 2) {
      if (myField[x][o] !== 0) {
        return;
      } else {
        myField[x][o] = currentPlayer;
      }
      selectedCell.innerHTML = `<span class="toe"></span>`;
      isWin(myField, currentPlayer);
      currentPlayer = 1;
    }
  });
}

function isWin(field, player) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] !== 0) {
        count++;
      }
    }
  }

  if (count === 45) {
    count = 0;
    winText.textContent = `Draw`
    text.textContent = `No one won`;
    return win.style.display = 'block';
  }

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 0) {
        countZero++;
      }
    }
  }

  if (countZero < 30) {
    return;
  }
  // Подсчет в ряд;
  for (let i = 0; i < field.length; i++) {
    let sumIJ = 0;
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === player) {
        sumIJ++;
        console.log(sumIJ)
      }
    }

    if (sumIJ === 3) {
      sumIJ = 0;
      count = 0;
      winText.textContent = `Win`
      text.textContent = `Player №${player}`;
      return win.style.display = 'block';
    }

  }

  // Подсчет в столбец;
  for (let j = 0; j < field.length; j++) {
    let sum = 0;

    for (let i = 0; i < field[j].length; i++) {
      if (field[i][j] === player) {
        sum++;
      }
    }

    if (sum === 3) {
      sum = 0;
      count = 0;
      text.textContent = `Player №${player}`;
      winText.textContent = `Win`
      return win.style.display = 'block';
    }
  }

  let sum = 0;
  // Подсчет наискось;

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (i === j && field[i][j] === player) {
        sum++;
      }
    }
  }

  if (sum === 3) {
    sum = 0;
    count = 0;
    text.textContent = `Player №${player}`;
    winText.textContent = `Win`

    return win.style.display = 'block';
  }

  let sumXY = 0;
  // Подсчет наискось в другую сторону;

  for (let i = 0; i < field.length; i++) {
    let j = 0;

    j = field[i].length - 1 - i;

    if (field[i][j] === player) {
      sumXY++;
    }
  }

  if (sumXY === 3) {
    sum = 0;
    count = 0;
    text.textContent = `Player №${player}`;
    winText.textContent = `Win`

    return win.style.display = 'block';
  }
}

function drawField(field, element) {
  let sectionField = '';

  for (let i = 0; i < field.length; i++) {
    sectionField += `<div class="cell__wrapper">`;

    for (let j = 0; j < field[i].length; j++) {
      if (i + 1 === field.length) {
        sectionField += `
          <div class="cell" data-x="${i}" data-y="${j}"
          style="margin-bottom: 0;">
          </div>
        `;
        continue;
      }

      if (j + 1 === field.length[i]) {
        sectionField += `
        <div class="cell" data-x="${i}" data-y="${j}" style="margin-right: 0;">
        </div>
        `;
      } else {
        sectionField += `<div class="cell" data-x="${i}" data-y="${j}"></div>`;
      }
    }
    sectionField += `</div>`;
  }

  element.innerHTML = `
    ${sectionField}
  `;
}

button.addEventListener('click', () => {
  const section = document.querySelector('.tictac__wrapper');
  const myField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  countZero = 0;
  count = 0;

  initGame();
  drawField(myField, section);
  win.style.display = 'none';
});
