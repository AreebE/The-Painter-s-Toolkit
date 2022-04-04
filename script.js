var text = document.getElementById("display");

console.log("finished loaded");
var canvas = document.getElementById("canvas");
 // 
var context = canvas.getContext("2d");
context.canvas.innerWidth = canvas.getBoundingClientRect().width;
context.canvas.innerHeight = canvas.getBoundingClientRect().height;
var prevPoint;

var INACTIVE = 1;
var ACTIVE = 0;
var state = 1;


function testMouse(event, touch)
{
    if (this.state == INACTIVE)
    {
        return;
    }
        // console.log("test" + canvas.toString());
    console.log ("called teh test");
    // state = ACTIVE;
    let bounds = canvas.getBoundingClientRect();
    // context.canvas.innerHeight = bounds.right - bounds.left;
    // context.canvas.innerWidth = bounds.up - bounds.down;
    let x = event.clientX;       
    let y = event.clientY;
    if (touch)
    {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    }
    
    const relLeft = x - bounds.left;
    const relTop = y - bounds.top;
    // console.log(left + ", " + top);
    text.innerHTML = "Mouse x = " + x + "; Mouse y = " + y
                    +"\n" + "RelativeX = " + (relLeft) + ", RelativeY = " + (relTop);
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.lineWidth = 10;
    
    context.beginPath();
    if (this.prevPoint != null)
    {
        context.moveTo(prevPoint.getX() / bounds.width * canvas.width, prevPoint.getY() / bounds.height * canvas.height);
        context.lineTo(relLeft / bounds.width * canvas.width, relTop / bounds.height * canvas.height);
        context.stroke();
        
        // console.log(bounds.right -bounds.left);
        // console.log("called draw, " + prevPoint.getX(), prevPoint.getY());
        // console.log("also, " + relLeft + ", " + relTop);
        // console.log("and " + x + ", " + y + " with " + bounds.left + ", " + bounds.top);
    }
    context.arc(relLeft / bounds.width * canvas.width, relTop / bounds.height * canvas.height, 4, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    this.prevPoint = new Point(relLeft, relTop);
}

function setMouseState(newState)
{
    // console.log("thesiujiowrfikrp");
    state = newState;   
    // console.log(state);
    this.prevPoint = null;
    // console.log(prev)
}