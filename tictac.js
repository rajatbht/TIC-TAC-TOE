// qwerty
var box = $(".board");
var restart = $("input");
var count = 0;
restart.click(function () {
  $("td").text("");
  count = 0;
  if (gameon) {
    $("#player h3").text(player1 + "'s Turn");
  } else {
    $("#player h3").text(player2 + "'s Turn");
  }
});
var x = 100;
var player1 = prompt("Player 1 Enter your Name, You will be 'X' ");
var player2 = prompt("Player 2 Enter your Name, You will be 'O' ");
if (player1 === player2) {
  player1 = "X";
  player2 = "O";
}
$("#player h3").text(player1 + "'s Turn");
function returnPointer(rowNo, colNo) {
  if ($("tr").eq(rowNo).find("td").eq(colNo).text() !== "") {
    return $("tr").eq(rowNo).find("td").eq(colNo).text();
  } else {
    console.log("row= " + rowNo + " col= " + colNo);
    x -= 1; //decrement to prevent it sending same value again and again so that it doesnt give matchcheck true
    return x;
  }
}
function matchCheck(a, b, c) {
  return a === b && a === c;
}

// horizontal matching
function horiCheck() {
  for (var row = 0; row < 3; row++) {
    var col = 0;
    if (
      matchCheck(
        returnPointer(row, col),
        returnPointer(row, col + 1),
        returnPointer(row, col + 2)
      )
    ) {
      return matchCheck(
        returnPointer(row, col),
        returnPointer(row, col + 1),
        returnPointer(row, col + 2)
      );
    }
  }
}
// vertical matching
function vertiCheck() {
  for (var col = 0; col < 3; col++) {
    var row = 0;
    if (
      matchCheck(
        returnPointer(row, col),
        returnPointer(row + 1, col),
        returnPointer(row + 2, col)
      )
    ) {
      return matchCheck(
        returnPointer(row, col),
        returnPointer(row + 1, col),
        returnPointer(row + 2, col)
      );
    }
  }
}
// diagonal matching
function diagCheck() {
  row = 0;
  col = 0;
  if (
    matchCheck(
      returnPointer(row, col),
      returnPointer(row + 1, col + 1),
      returnPointer(row + 2, col + 2)
    )
  ) {
    return matchCheck(
      returnPointer(row, col),
      returnPointer(row + 1, col + 1),
      returnPointer(row + 2, col + 2)
    );
  } else if (
    matchCheck(
      returnPointer(row, col + 2),
      returnPointer(row + 1, col + 1),
      returnPointer(row + 2, col)
    )
  ) {
    return matchCheck(
      returnPointer(row, col + 2),
      returnPointer(row + 1, col + 1),
      returnPointer(row + 2, col)
    );
  }
}
// TIE
function tie() {
  if (count === 8) {
    setTimeout(function () {
      $("#player h3").text("Its a TIE!!");
      alert("Its a TIE!!");
    }, 500);
  } else {
    count += 1;
  }
}
gameon = true;
function fill() {
  $("#player h3").text(player1 + "'s Turn");
  if ($(this).text() === "" && gameon) {
    $(this).text("X");
    $(this).css("color", "red");
    gameon = false;
    if (horiCheck() || vertiCheck() || diagCheck()) {
      setTimeout(function () {
        $("#player h3").text("Game Over!!");
        alert("X Wins!!");
      }, 500);
    } else {
      tie();
    }
    $("#player h3").text(player2 + "'s Turn");
  } else if ($(this).text() === "" && !gameon) {
    $(this).text("O");
    $(this).css("color", "blue");
    gameon = true;
    if (horiCheck() || vertiCheck() || diagCheck()) {
      setTimeout(function () {
        $("#player h3").text("Game Over!!");
        alert("O Wins!!");
      }, 500);
    } else {
      tie();
    }
  } else {
    alert("NO Space Left!!");
  }
}
box.find("tr").each(function () {
  $(this)
    .find("td")
    .each(function () {
      $(this).click(fill);
    });
});

// dark mode
$("a").click(function () {
  $("body").toggleClass("dark");
});
