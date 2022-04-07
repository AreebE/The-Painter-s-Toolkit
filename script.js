var text = document.getElementById("display");

console.log("finished loaded");
document.getElementsByClassName
var canvas = document.getElementById("canvas");
 // 
var context = canvas.getContext("2d");
context.canvas.innerWidth = canvas.getBoundingClientRect().width;
context.canvas.innerHeight = canvas.getBoundingClientRect().height;
var prevPoint;

var INACTIVE = 1;
var ACTIVE = 0;
var state = 1;
var lineStroke = 5;

const valMap = new Map();

valMap.set(0, '0');
valMap.set(1, '1');
valMap.set(2, '2');
valMap.set(3, '3');
valMap.set(4, '4');
valMap.set(5, '5');
valMap.set(6, '6');
valMap.set(7, '7');
valMap.set(8, '8');
valMap.set(9, '9');
valMap.set(10, 'a');
valMap.set(11, 'b');
valMap.set(12, 'c');
valMap.set(13, 'd');
valMap.set(14, 'e');
valMap.set(15, 'f');

function testMouse(event, touch)
{
    if (this.state == INACTIVE)
    {
        return;
    }
        // console.log("test" + canvas.toString());
    // console.log ("called teh test");
    // state = ACTIVE;
    let bounds = canvas.getBoundingClientRect();
    // context.canvas.innerHeight = bounds.right - bounds.left;
    // context.canvas.innerWidth = bounds.up - bounds.down;
    
    
    
    // console.log(bounds.width + ", " + bounds.height);
    // console.log(context.canvas.innerWidth + ';'  +  context.canvas.innerHeight)
    // text.innerHTML = "Mouse x = " + x + "; Mouse y = " + y
                    // +"\n" + "RelativeX = " + (relLeft) + ", RelativeY = " + (relTop);
    // context.strokeStyle = 'black';
    // context.fillStyle = 'black';
    context.lineWidth = lineStroke;
    
                // console.log("Running loop  " + lineStroke);

    let x = event.clientX;       
    let y = event.clientY;
    if (x == undefined)
    {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    }
    const relLeft = x - bounds.left;
    const relTop = y - bounds.top;
    // const totWidth = canvas.style.width;
    // const totHeight = canvas.style.height;
    context.beginPath()
    
    if (this.prevPoint != null)
    {
        // context.lin
        context.moveTo(prevPoint.getX() / bounds.width * canvas.width, prevPoint.getY() / bounds.height * canvas.height);
        context.lineTo(relLeft / bounds.width * canvas.width, relTop / bounds.height * canvas.height);
        context.stroke();
        
        // console.log(bounds.right -bounds.left);
        // console.log("called draw, " + prevPoint.getX(), prevPoint.getY());
        // console.log("also, " + relLeft + ", " + relTop);
        // console.log("and " + x + ", " + y + " with " + bounds.left + ", " + bounds.top);
    }
        context.arc(relLeft / bounds.width * canvas.width, relTop / bounds.height * canvas.height, lineStroke / 2, 0, Math.PI * 2);

    context.fill();
    context.closePath();
    this.prevPoint = new Point(relLeft, relTop);
}


function setMouseState(event, newState)
{
    // console.log("thesiujiowrfikrp" + event);
    context.beginPath();
        let bounds = canvas.getBoundingClientRect();

    let x = event.clientX;       
    let y = event.clientY;
    if (x == undefined)
    {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    }
    const relLeft = x - bounds.left;
    const relTop = y - bounds.top;
    context.arc(relLeft / bounds.width * canvas.width, relTop / bounds.height * canvas.height, lineStroke / 2, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    state = newState;   
    // console.log(state);
    this.prevPoint = null;
    // console.log(prev)
}

function resizeCanvas()
{
    let height = document.getElementById("height").value; 
    let width = document.getElementById("width").value;
    context.canvas.innerWidth = width;
    context.canvas.innerHeight = height;
    canvas.height = height;
    canvas.width = width;
    console.log(height + ", " + width);
    // canvas.resize();
    return false;
}

function adjustLineStroke()
{
    this.lineStroke = document.getElementById("stroke").value;
    // console.log("called the srtoke" +document.getElementById("stroke").innerHTML) ;

    return false;
}

function changeColor()
{
    let red       = document.getElementById("red").value;
    let green     = document.getElementById("green").value;
    let blue      = document.getElementById("blue").value;
    let opacity   = document.getElementById("opacity").value;

    // console.log (red + ", " + green + ", " + blue);
    
    console.log(convertToHexcode([red, green, blue, opacity]));
    let code = convertToHexcode([red, green, blue, opacity]);
    context.strokeStyle = code;
    context.fillStyle = code;
}

function convertToHexcode(values)
{
    let code = "#";
    for (let i = 0; i < values.length; i++)
    {
        let val = values[i];
        let times = 0;
        while (times * 16 <= val)
        {
            times++;
        }
        times--;
        val -= times * 16;
        // console.log(val);
        code += valMap.get(times) + "" + valMap.get(val);       
    }
    return code;
}

function getFileName()
{
    return document.getElementById("fileName").value;        
}

function downloadImg(aElement)
{
    aElement.href = canvas.toDataURL("image/png");
    aElement.download =getFileName();
    // aElement.click();
    console.log("saved, " + aElement.href);
}