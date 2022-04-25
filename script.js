class Listener
{
    constructor()
    {
        
    }

    changedCanvas()
    {
        drawCompleteDrawing();
    }
    
}

var text = document.getElementById("display");

console.log("finished loaded");
// document.getElementsByClassName
var canvasHolders = document.getElementsByClassName("canvasHolder");
var canvas = document.getElementById("canvas");
 // 
var context = canvas.getContext("2d");
context.canvas.innerWidth = canvas.getBoundingClientRect().width;
context.canvas.innerHeight = canvas.getBoundingClientRect().height;
var prevPoint;
var menu = document.getElementById("layers")

var INACTIVE = 1;
var ACTIVE = 0;
var state = 1;
var lineStroke = 5;
var completeDrawing = document.getElementById("canvasForDrawing");
var drawing = new CompleteCanvas(context.getImageData(0, 0, canvas.width, canvas.height), canvas.width, canvas.height, menu, new Listener());

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

document.getElementById("currentLayerSelected").value = drawing.getCurrentIndex();
document.getElementById("height").value = 150;
document.getElementById("width").value = 300;
document.getElementById("stroke").value = 5;
document.getElementById("red").value = 0;
document.getElementById("green").value = 0;
document.getElementById("blue").value = 0;

changeSliderColor();
changeColor();
// deleteLayer();

var LARGEST_SIZE = 600;
var SMALLEST_SIZE = 50;
function testMouse(event, touch)
{
        // console.log("here," + event.touches[0].clientX);

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

    let x = event.offsetX;       
    let y = event.offsetY;
    if (x == undefined)
    {
        x = event.touches[0].clientX - bounds.left;
        y = event.touches[0].clientY - bounds.top;
    }
    // const relLeft = x - bounds.left;
    // const relTop = y - bounds.top;
    // const totWidth = canvas.style.width;
    // const totHeight = canvas.style.height;
    context.beginPath()
    
    if (this.prevPoint != null)
    {
        // context.lin
        context.moveTo(prevPoint.getX() / bounds.width * canvas.width, prevPoint.getY() / bounds.height * canvas.height);
        context.lineTo(x / bounds.width * canvas.width, y / bounds.height * canvas.height);
        context.stroke();
        
        // console.log(bounds.right -bounds.left);
        // console.log("called draw, " + prevPoint.getX(), prevPoint.getY());
        // console.log("also, " + relLeft + ", " + relTop);
        // console.log("and " + x + ", " + y + " with " + bounds.left + ", " + bounds.top);
    }
        context.arc(x / bounds.width * canvas.width, y / bounds.height * canvas.height, lineStroke / 2, 0, Math.PI * 2);
    // console.log(x + ", " + y);
    context.fill();
    context.closePath();
    this.prevPoint = new Point(x, y);
    // console.log(completeDrawing.getContext("2d"));
    // console.log(drawing.getCompleteDrawing() == null);
    drawing.updateData(context.getImageData(0, 0, canvas.width, canvas.height))
    completeDrawing.getContext("2d").putImageData(drawing.getCompleteDrawing(), 0, 0);
}

function drawCompleteDrawing()
{
    completeDrawing.getContext("2d").putImageData(drawing.getCompleteDrawing(), 0, 0);
}

function setMouseState(event, newState)
{
    // console.log("thesiujiowrfikrp" + newState);
    if (newState == ACTIVE)
    {
         context.beginPath();
        let bounds = canvas.getBoundingClientRect();
   
        let x = event.offsetX;       
        let y = event.offsetY;
        
        if (x == undefined)
        {
            x = event.touches[0].clientX - bounds.left;
            y = event.touches[0].clientY - bounds.top;
        }
        // const relLeft = x - bounds.left;
        // const relTop = y - bounds.top;
        context.arc(x / bounds.width * canvas.width, y / bounds.height * canvas.height, lineStroke / 2, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
    
    state = newState;   
    // console.log(state);
    this.prevPoint = null;
    // console.log(prev)
}

function resizeCanvas()
{
    let height = document.getElementById("height").value; 
    let width = document.getElementById("width").value;
    // context.canvas.innerWidth = width;
    // context.canvas.innerHeight = height;
    let canvasHeight = height;
    let canvasWidth = width;
    let ratio = width / height;
    const currentImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  
    
    canvasHolders[0].style.height = canvasHeight + "px";
    canvasHolders[0].style.width = canvasWidth + "px";
    canvasHolders[1].style.height = canvasHeight + "px";
    canvasHolders[1].style.width = canvasWidth + "px";
    canvas.height = height;
    canvas.width = width;
    console.log(height + ", " + width);
    // canvas.drawImage(imageData, 0, 0);
    context.putImageData(currentImageData, 0, 0);
    drawing.resize(width, height);
    completeDrawing.height = height;
    completeDrawing.width = width;
    // canvas.resize();
    return false;
}

function adjustLineStroke()
{
    this.lineStroke = document.getElementById("stroke").value;
    // console.log("called the srtoke" +document.getElementById("stroke").innerHTML) ;

    return false;
}

function changeSliderColor()
{
    // console.log("called");
    let currentColorDisplay = document.getElementById("currentColor");
    let red       = document.getElementById("red");
    let green     = document.getElementById("green");
    let blue      = document.getElementById("blue");
    let colors = 
        [
            convertToHexcode([0, green.value, blue.value, 255]),
            convertToHexcode([255, green.value, blue.value, 255]),
            convertToHexcode([red.value, 0, blue.value, 255]),
            convertToHexcode([red.value, 255, blue.value, 255]),
            convertToHexcode([red.value, green.value, 0, 255]),
            convertToHexcode([red.value, green.value, 255, 255])
        ];
    console.log(colors);
    console.log(red.style.background +"aa");
    red.style.background = "linear-gradient(to right, " + colors[0] + ", " + colors[1] +")";
    green.style.background = "linear-gradient(to right, " + colors[2] + ", " + colors[3] +")";
    blue.style.background = "linear-gradient(to right, " + colors[4] + ", " + colors[5] +")";
    currentColorDisplay.style.backgroundColor = "rgb(" + red.value + "," + green.value + "," + blue.value + ")";
}
function changeColor()
{
    let red       = document.getElementById("red").value;
    let green     = document.getElementById("green").value;
    let blue      = document.getElementById("blue").value;

    // console.log (red + ", " + green + ", " + blue);
    
    // console.log(convertToHexcode([red, green, blue, opacity]));
    let code = "rgb(" + red + "," + green + "," + blue + ")";
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
    aElement.href = completeDrawing.toDataURL("image/png");
    aElement.download = getFileName();
    // aElement.click();
    console.log("saved, " + aElement.href);
}

/**
* Does it refer to this?
*/
function addAnotherLayer(isBefore)
{
    let layerSelected = parseInt(document.getElementById("currentLayerSelected").value);
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log()
    if (!isBefore)
    {
        layerSelected += 1;
    }
    drawing.addLayer(layerSelected, context.getImageData(0, 0, canvas.width, canvas.height));
    document.getElementById("currentLayerSelected").value = drawing.getCurrentIndex();
}

function changeLayer()
{
    console.log("here, " + drawing.getNumLayers());
    let layerSelected = document.getElementById("currentLayerSelected").value;
    if (layerSelected >= 0 && layerSelected <= drawing.getNumLayers() - 1)
    {
        console.log("creating layer");
        drawing.selectLayer(layerSelected);
        context.clearRect(0, 0, canvas.width, canvas.height);      
        context.putImageData(drawing.getCurrentData(), 0, 0);
    }
}

function deleteALayer()
{
    if (drawing.getNumLayers() == 1)
    {
        drawing.clearLayer(0);
        context.clearRect(0, 0, canvas.width, canvas.height);      
    }
    else 
    {
        let layerSelected = parseInt(document.getElementById("currentLayerSelected").value);
        drawing.deleteLayer(layerSelected);
        context.clearRect(0, 0, canvas.width, canvas.height);      
        context.putImageData(drawing.getCurrentData(), 0, 0);
    }
    document.getElementById("currentLayerSelected").value = drawing.getCurrentIndex();
       
}