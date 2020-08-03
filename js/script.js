var canvas, ctx, flag = false,
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

        btnEraser.addEventListener("click", eraser)
        btnPen.addEventListener("click", pen)

        canvas = document.getElementById('can');
        ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        w = canvas.width;
        h = canvas.height;

        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);
    }

    function color(obj) {
        x = obj.id;
    }

    
    /**PEN */
    // ctx.globalCompositeOperation="source-over";
    //         ctx.moveTo(prevX, prevY);
    //         ctx.lineTo(currX, currY);
    //         ctx.strokeStyle = x;
    //         ctx.lineWidth = y;
    //         ctx.linCap = 'round';
    //         ctx.stroke();
    //         ctx.closePath();


    function draw() {
        ctx.beginPath();
        if(mode == 'pen') {
            ctx.globalCompositeOperation="source-over";
            
            ctx.beginPath();
            ctx.rect(prevX, currY, 200, 100);
            ctx.fillStyle = 'yellow';
            ctx.fill();
            ctx.lineWidth = 7;
            ctx.strokeStyle = 'black';
            ctx.stroke();

        }else {
            ctx.globalCompositeOperation="destination-out";
            ctx.arc(prevX,prevY,38,0,Math.PI*2,false);
            ctx.fill();
        }
    }

   
    function eraser() {
        mode ="eraser"
    }
    function pen() {
        mode ="pen"
    }

    function clean() {
        var m = confirm("Want to clear");
        if (m) {
            ctx.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    }

    function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";
    }

    function findxy(res, e) {
        if (res == 'down') {
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
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }