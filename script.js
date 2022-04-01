const text = document.getElementById("display");

console.log("finished loaded");
const canvas = document.getElementById("canvas");
canvas.width = 1444;
canvas.height = 1444;

const context = canvas.getContext("2d");
var mouseDown;
var prevPoint;
var state;

const INACTIVE = 0;
const ACTIVE = 1;

function testMouse(event)
{
    if (this.state == INACTIVE)
    {
        console.log("inactive, " + this.prevPoint);
        return;
    }
        // console.log("test" + canvas.toString());
    
    // state = ACTIVE;
    let bounds = canvas.getBoundingClientRect();
    context.canvas.innerHeight = bounds.right - bounds.left;
    context.canvas.innerWidth = bounds.up - bounds.down;
    const x = event.clientX;       
    const y = event.clientY;
    const relLeft = x - bounds.left;
    const relTop = y - bounds.top;
    // console.log(left + ", " + top);
    text.innerHTML = "Mouse x = " + x + "; Mouse y = " + y
                    +"\n" + "RelativeX = " + (relLeft) + ", RelativeY = " + (relTop);
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.lineWidth = 10;
    
    if (this.prevPoint != null)
    {
        context.beginPath();
        context.moveTo(prevPoint.getX() / bounds.width * canvas.width, prevPoint.getY() / bounds.height * canvas.height);
        context.lineTo(relLeft / bounds.width * canvas.width, relTop / bounds.height * canvas.height);
        // context.arc(relLeft / bounds.width * 1444, relTop / bounds.height * 1000, 4, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
        // console.log(bounds.right -bounds.left);
        // console.log("called draw, " + prevPoint.getX(), prevPoint.getY());
        // console.log("also, " + relLeft + ", " + relTop);
        // console.log("and " + x + ", " + y + " with " + bounds.left + ", " + bounds.top);
    }
    this.prevPoint = new Point(relLeft, relTop);
}

function setMouseState(newState)
{
    console.log("thesiujiowrfikrp");
    state = newState;   
    console.log(state);
    this.prevPoint = null;
    // console.log(prev)
}