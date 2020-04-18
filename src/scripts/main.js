'use strict';

const button = document.querySelector('.button');
const win = document.querySelector('.win');
const text = document.querySelector('.win__player');
let firstDraw = false;
const countForWin = 3;
let moveCounter = 0;

initGame();

function initGame() {
  const section = document.querySelector('.tictac__wrapper');
  const myField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let currentPlayer = 1;
  let pastPlayer = 2;

  if (!firstDraw) {
    firstDraw = true;
    drawField(myField, section);
  }

  section.addEventListener('click', event => {
    const selectedCell = event.target.closest('.cell');
    if (!selectedCell) {
      return;
    }

    selectedCell.classList.add('no-hover');

    const x = selectedCell.dataset.x;
    const y = selectedCell.dataset.y;
    const coordsArray = [+x, +y];

    if (currentPlayer === 1) {
      if (myField[x][y] !== 0) {
        return;
      } else {
        myField[x][y] = currentPlayer;
        moveCounter++;
      }

      selectedCell.innerHTML = `<span class="tic"></span>`;

      if (moveCounter > 4) {
        checkDraw(myField);
        horizontalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        verticalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveRightSearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveLeftSearch(myField, coordsArray, currentPlayer, pastPlayer);
      }
      pastPlayer = currentPlayer;
      currentPlayer = 2;

      return;
    } else if (currentPlayer === 2) {
      if (myField[x][y] !== 0) {
        return;
      } else {
        myField[x][y] = currentPlayer;
        moveCounter++;
      }

      selectedCell.innerHTML = `<span class="toe"></span>`;

      if (moveCounter > 4) {
        checkDraw(myField);
        horizontalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        verticalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveRightSearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveLeftSearch(myField, coordsArray, currentPlayer, pastPlayer);
      }

      pastPlayer = currentPlayer;
      currentPlayer = 1;

      return;
    }
  });

}

function checkDraw(field) {
  let counter = 0;

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 0) {
        counter++;
      }
    }
  }

  if (counter === 0) {
    counter = 0;
    text.textContent = `No one won!`;
    win.style.display = 'block';

    return;
  }
}

function horizontalySearch(field, coords, player, pastMove) {
  const section = document.querySelector('.tictac__wrapper');
  const [x, y] = coords;
  let sumHoriz = 0;

  for (let i = y; i < countForWin; i++) {
    if (field[x][i + 1] === 0) {
      return;
    }

    if (field[x][i + 1] === pastMove) {
      return;
    }

    if (field[x][i + 1] && field[x][i + 1] === player) {
      sumHoriz++;
    }
  }

  for (let i = y; i > 0; i--) {
    if (field[x][i - 1] && field[x][i - 1] === player) {
      sumHoriz++;
    }
  }

  sumHoriz++;

  if (sumHoriz === countForWin) {
    sumHoriz = 0;
    text.textContent = `Player ${player} won`;
    win.style.display = 'block';
    clearField(section);

    return;
  }
}

function verticalySearch(field, coords, player, pastMove) {
  const section = document.querySelector('.tictac__wrapper');
  const [x, y] = coords;
  let sumVert = 0;

  for (let i = x; i < countForWin; i++) {
    if (i + 1 === field.length) {
      continue;
    }

    if (field[i + 1][y] === pastMove || field[i + 1][y] === 0) {
      continue;
    }

    if (field[i + 1][y] === player) {
      sumVert++;
    }
  }

  for (let i = x; i > 0; i--) {
    if (field[i - 1][y] && field[i - 1][y] === player) {
      sumVert++;
    }
  }

  sumVert++;

  if (sumVert === countForWin) {
    sumVert = 0;
    text.textContent = `Player ${player} won`;
    win.style.display = 'block';
    clearField(section);

    return;
  }
}

function curveRightSearch(field, coords, player, pastMove) {
  const section = document.querySelector('.tictac__wrapper');
  const [x] = coords;
  let sumCurveR = 0;

  for (let i = x; i < countForWin; i++) {
    if (i + 1 === field.length) {
      continue;
    }

    if (field[i + 1][i + 1] === 0 || field[i + 1][i + 1] === pastMove) {
      continue;
    }

    if (field[i + 1][i + 1] === player) {
      sumCurveR++;
    }
  }

  for (let i = x; i > 0; i--) {
    if (field[i - 1][i - 1] === 0 || field[i - 1][i - 1] === pastMove) {
      continue;
    }

    if (field[i - 1][i - 1] && field[i - 1][i - 1] === player) {
      sumCurveR++;
    }
  }

  sumCurveR++;

  if (sumCurveR === countForWin) {
    sumCurveR = 0;
    text.textContent = `Player ${player} won`;
    win.style.display = 'block';
    clearField(section);

    return;
  }
}

function curveLeftSearch(field, coords, player, pastMove) {
  const section = document.querySelector('.tictac__wrapper');
  const [x, y] = coords;
  let sumCurveL = 0;
  let yCoordUp = y;
  let yCoordDown = y;

  for (let i = x; i < countForWin; i++) {
    if (yCoordUp <= 0) {
      continue;
    }

    if (i + 1 === field.length) {
      continue;
    }

    if (field[i + 1][yCoordUp - 1] === 0
      || field[i + 1][yCoordUp - 1] === pastMove) {
      continue;
    }

    if (field[i + 1][yCoordUp - 1] === player) {
      sumCurveL++;
    }
    yCoordUp--;
  }

  for (let i = x; i > 0; i--) {
    if (yCoordDown === field[x].length) {
      continue;
    }

    if (field[i - 1][yCoordDown + 1] === 0
      || field[i - 1][yCoordDown + 1] === pastMove) {
      continue;
    }

    if (field[i - 1][yCoordDown + 1]
      && field[i - 1][yCoordDown + 1] === player) {
      yCoordDown++;
      sumCurveL++;
    }
  }

  sumCurveL++;

  if (sumCurveL !== countForWin || sumCurveL < countForWin) {
    return;
  }

  if (sumCurveL === countForWin) {
    sumCurveL = 0;
    text.textContent = `Player ${player} won`;
    win.style.display = 'block';
    clearField(section);

    return;
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

function clearField(element) {
  element.innerHTML = ``;
}

button.addEventListener('click', () => {
  const section = document.querySelector('.tictac__wrapper');
  const myField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  moveCounter = 0;

  drawField(myField, section);
  win.style.display = 'none';
  initGame();
});
