'use strict';

const button = document.querySelector('.button');
const win = document.querySelector('.win__homoku');
const text = document.querySelector('.win__player-homoku');
const playerNumber = document.querySelector('.number-player');
const winPlayerText = document.querySelector('.win__text-homoku');

let firstDraw = false;
const countForWin = 5;
let moveCounter = 0;

initGame();

function initGame() {
  const section = document.querySelector('.homoku__wrapper');
  const myField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let currentPlayer = 1;
  let pastPlayer = 2;

  if (!firstDraw) {
    firstDraw = true;
    drawField(myField, section);
    playerNumber.textContent = `нажми на поле, чтобы начать`

  }

  section.addEventListener('click', event => {
    const selectedCell = event.target.closest('.homoku-cell');
    if (!selectedCell) {
      return;
    }
    playerNumber.textContent = `Ходит игрок номер ${pastPlayer}`
    selectedCell.classList.add('no-hover__homoku');

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

      selectedCell.innerHTML = `
      <img src="images/white.jpg" alt="" width="30" class="chip">
      `;

      if (moveCounter > 4) {
        // horizontalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        verticalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        // curveRightSearch(myField, coordsArray, currentPlayer, pastPlayer);
        // curveLeftSearch(myField, coordsArray, currentPlayer, pastPlayer);
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

      selectedCell.innerHTML = `
        <img src="images/black.jpg" alt="" width="30" class="chip">
      `;

      if (moveCounter > 4) {
        // horizontalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        verticalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        // curveRightSearch(myField, coordsArray, currentPlayer, pastPlayer);
        // curveLeftSearch(myField, coordsArray, currentPlayer, pastPlayer);
      }

      pastPlayer = currentPlayer;
      currentPlayer = 1;

      return;
    }
  });

}

// function horizontalySearch(field, coords, player, pastMove) {
//   const [x, y] = coords;
//   let lessWay = 0;
//   let sumHoriz = 0;

//   for (let i = y; i < countForWin + y; i++) {
//     if (field[x][i + 1] === 0) {
//       continue;
//     }

//     if (field[x][i + 1] === pastMove) {
//       continue;
//     }

//     if (field[x][i + 1] && field[x][i + 1] === player) {
//       sumHoriz++;
//     }
//   }

//   if (y - countForWin < 0) {
//     lessWay = 0;
//   } else {
//     lessWay = countForWin;
//   }

//   for (let i = y; i > lessWay; i--) {
//     if (field[x][i - 1] && field[x][i - 1] === player) {
//       sumHoriz++;
//     }
//   }

//   sumHoriz++;

//   if (sumHoriz === countForWin) {
//     playerNumber.textContent = 'Победа';
//     sumHoriz = 0;
//     winPlayerText.textContent = `Победил игрок номер ${player}`;
//     win.style.display = "block";

//     return;
//   }
// }

function verticalySearch(field, coords, player, pastMove) {
  const [x, y] = coords;
  let lessWay = 0;
  let highestWay = 0;
  let sumVert = 0;
  console.log('x', x)

  if (countForWin + x > field.length) {
    highestWay = field.length;
  } else {
    highestWay = countForWin + x;
  }

  for (let i = x; i < highestWay; i++) {
    if (i + 1 >= field.length) {
      continue;
    }

    if (field[i + 1][y] === pastMove || field[i + 1][y] === 0) {
      continue;
    }

    if (field[i + 1][y] === player) {
      sumVert++;
    }
  }

  if (x - countForWin < 0) {
    lessWay = 0;
  } else {
    lessWay = x - countForWin;
  }

  for (let i = x; i > lessWay; i--) {
    if (!field[i - 1][y]) {
      continue;
    }

    if (field[i - 1][y] && field[i - 1][y] === player) {
      sumVert++;
    }
  }

  sumVert++;
  console.log('sumVert',sumVert)
  if (sumVert === countForWin) {
    playerNumber.textContent = 'Победа';
    sumVert = 0;
    winPlayerText.textContent = `Победил игрок номер ${player}`;
    win.style.display = "block";

    return;
  }
}

// function curveRightSearch(field, coords, player, pastMove) {
//   const [x, y] = coords;
//   let sumCurveR = 0;

//   for (let i = x; i < countForWin; i++) {
//     if (i + 1 === field.length) {
//       continue;
//     }

//     if (field[i + 1][y + 1] === 0 || field[i + 1][y + 1] === pastMove) {
//       continue;
//     }

//     if (field[i + 1][i + 1] === player) {
//       sumCurveR++;
//     }
//   }

//   for (let i = x; i > 0; i--) {
//     if (field[i - 1][y - 1] === 0 || field[i - 1][y - 1] === pastMove) {
//       continue;
//     }

//     if (field[i - 1][y - 1] && field[i - 1][y - 1] === player) {
//       sumCurveR++;
//     }
//   }

//   sumCurveR++;

//   if (sumCurveR === countForWin) {
//     playerNumber.textContent = 'Победа';
//     sumCurveR = 0;
//     winPlayerText.textContent = `Победил игрок номер ${player}`;
//     win.style.display = "block";

//     return;
//   }
// }

// function curveLeftSearch(field, coords, player, pastMove) {
//   const [x, y] = coords;
//   let sumCurveL = 0;
//   let yCoordUp = y;
//   let yCoordDown = y;

//   for (let i = x; i < countForWin; i++) {
//     if (yCoordUp <= 0) {
//       continue;
//     }

//     if (i + 1 === field.length) {
//       continue;
//     }

//     if (field[i + 1][yCoordUp - 1] === 0
//       || field[i + 1][yCoordUp - 1] === pastMove) {
//       continue;
//     }

//     if (field[i + 1][yCoordUp - 1] === player) {
//       sumCurveL++;
//     }
//     yCoordUp--;
//   }

//   for (let i = x; i > 0; i--) {
//     if (yCoordDown === field[x].length) {
//       continue;
//     }

//     if (field[i - 1][yCoordDown + 1] === 0
//       || field[i - 1][yCoordDown + 1] === pastMove) {
//       continue;
//     }

//     if (field[i - 1][yCoordDown + 1]
//       && field[i - 1][yCoordDown + 1] === player) {
//       yCoordDown++;
//       sumCurveL++;
//     }
//   }

//   sumCurveL++;

//   if (sumCurveL !== countForWin || sumCurveL < countForWin) {
//     return;
//   }

//   if (sumCurveL === countForWin) {
//     playerNumber.textContent = 'Победа';
//     sumCurveL = 0;
//     winPlayerText.textContent = `Победил игрок номер ${player}`;
//     win.style.display = "block";

//     return;
//   }
// }

function drawField(field, element) {
  let sectionField = '';

  for (let i = 0; i < field.length; i++) {
    sectionField += `<div class="homoku-cell__wrapper">`;

    for (let j = 0; j < field[i].length; j++) {
      if (i + 1 === field.length) {
        sectionField += `
          <div class="homoku-cell" data-x="${i}" data-y="${j}"></div>
        `;
        continue;
      }

      if (j + 1 === field.length[i]) {
        sectionField += `
        <div class="homoku-cell" data-x="${i}" data-y="${j}"></div>
        `;
      } else {
        sectionField += `<div class="homoku-cell" data-x="${i}" data-y="${j}"></div>`;
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
  const section = document.querySelector('.homoku__wrapper');
  const myField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  moveCounter = 0;

  drawField(myField, section);
  win.style.display = 'none';
  initGame();
});
