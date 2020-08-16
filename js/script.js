var canvas,
  ctx,
  flag = false,
  prevX = 0,
  currX = 0,
  prevY = 0,
  currY = 0,
  dot_flag = false,
  mode = "pen";

var x = "black",
  y = 2;

function init() {
  const btnEraser = document.getElementById("eraser");
  const btnPen = document.getElementById("pen");
  const btnSquare = document.getElementById("square");

  btnEraser.addEventListener("click", eraser);
  btnPen.addEventListener("click", pen);
  btnSquare.addEventListener("click", square);

  canvas = document.getElementById("can");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;

  canvas.addEventListener(
    "mousemove",
    function (e) {
      findxy("move", e);
    },
    false
  );
  canvas.addEventListener(
    "mousedown",
    function (e) {
      findxy("down", e);
    },
    false
  );
  canvas.addEventListener(
    "mouseup",
    function (e) {
      findxy("up", e);
    },
    false
  );
  canvas.addEventListener(
    "mouseout",
    function (e) {
      findxy("out", e);
    },
    false
  );
}

function color(obj) {
  x = obj.id;
}

function draw() {
  ctx.beginPath();
  if (mode == "pen") {
    ctx.globalCompositeOperation = "source-over";

    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.linCap = "round";
    ctx.stroke();
    ctx.closePath();
  } else if (mode == "square") {
    if (isDrawing) {
        isDrawing = false;
      ctx.beginPath();
      ctx.rect(currX, currY, 200, 200);
      ctx.stroke();
      canvas.style.cursor = "crosshair";
    } else {
      isDrawing = true;
      startX = currX;
      startY = currY;
      canvas.style.cursor = "crosshair";
    }
  } else {
    ctx.globalCompositeOperation = "destination-out";
    ctx.arc(prevX, prevY, 38, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

function eraser() {
  mode = "eraser";
}
function pen() {
  mode = "pen";
}
function square() {
  mode = "square";
}

function clean() {
  var answer = confirm("¿Quieres borrar todo?");
  if (answer) {
    ctx.clearRect(0, 0, width, height);
  }
}

function findxy(res, e) {
  if (res == "down") {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
      ctx.beginPath();
      ctx.fillStyle = x;
      ctx.fillRect(currX, currY, 2, 2);
      ctx.closePath();
      dot_flag = false;
    }
  }
  if (res == "up" || res == "out") {
    flag = false;
  }
  if (res == "move") {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      draw();
    }
  }
}
