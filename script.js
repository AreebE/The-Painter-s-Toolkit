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

class PaletteListener
{
    constructor()
    {}

    passHexcode(newHexcode)
    {
        document.getElementById("hashcode").value = newHexcode;
        changeColor();
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

var paletteMenu = document.getElementById("paletteMenu");
var palette = new Palette(paletteMenu, new PaletteListener());
// num --> char
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
valMap.set(10, 'A');
valMap.set(11, 'B');
valMap.set(12, 'C');
valMap.set(13, 'D');
valMap.set(14, 'E');
valMap.set(15, 'F');

// char --> num
valMap.set('0', 0);
valMap.set('1', 1);
valMap.set('2', 2);
valMap.set('3', 3);
valMap.set('4', 4);
valMap.set('5', 5);
valMap.set('6', 6);
valMap.set('7', 7);
valMap.set('8', 8);
valMap.set('9', 9);
valMap.set('A', 10);
valMap.set('B', 11);
valMap.set('C', 12);
valMap.set('D', 13);
valMap.set('E', 14);
valMap.set('F', 15);

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
        changeColor();

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
    let proposedColorDisplay = document.getElementById("proposedColor");
    let red       = document.getElementById("red");
    let green     = document.getElementById("green");
    let blue      = document.getElementById("blue");
    let hashcode = document.getElementById("hashcode");
    let colors = 
        [
            convertToHexcode([0, green.value, blue.value, 255]),
            convertToHexcode([255, green.value, blue.value, 255]),
            convertToHexcode([red.value, 0, blue.value, 255]),
            convertToHexcode([red.value, 255, blue.value, 255]),
            convertToHexcode([red.value, green.value, 0, 255]),
            convertToHexcode([red.value, green.value, 255, 255])
        ];
    // console.log(colors);
    // console.log(red.style.background +"aa");
    red.style.background = "linear-gradient(to right, " + colors[0] + ", " + colors[1] +")";
    green.style.background = "linear-gradient(to right, " + colors[2] + ", " + colors[3] +")";
    blue.style.background = "linear-gradient(to right, " + colors[4] + ", " + colors[5] +")";
    hashcode.value =  convertToHexcode([red.value, green.value, blue.value]);
    proposedColorDisplay.style.backgroundColor = "rgb(" + red.value + "," + green.value + "," + blue.value + ")";

}

function addToPalette()
{
    let code = document.getElementById("hashcode").value;
    const COLOR_HASHCODE_REGEX = new RegExp("#[0-9A-F]{6}");
    if (COLOR_HASHCODE_REGEX.test(code))
    {
        palette.addColor(code);
    }
}
function changeColor()
{
    let red       = document.getElementById("red");
    let green     = document.getElementById("green");
    let blue      = document.getElementById("blue");
    // console.log (red + ", " + green + ", " + blue);
    
    // console.log(convertToHexcode([red, green, blue, opacity]));
    let code = document.getElementById("hashcode");
    const COLOR_HASHCODE_REGEX = new RegExp("#[0-9A-F]{6}");
    // console.log(code.value + ", " + COLOR_HASHCODE_REGEX.test(code.value))
    if (COLOR_HASHCODE_REGEX.test(code.value))
    {
        let hashcode = ''+ code.value;
        // console.log(code.value);
        let currentBrush = document.getElementById("currentColor");
        context.strokeStyle = code.value;
        context.fillStyle = code.value;
        red.value = convertToVal(hashcode.substring(1, 3));
        green.value = convertToVal(hashcode.substring(3, 5));
        blue.value = convertToVal(hashcode.substring(5, 7));

        // console.log(hashcode.substring(1, 3));
        // console.log(convertToVal(hashcode.substring(1, 3)));
        // console.log (red.value + "," + blue.value + ", " + green.value + "");
        currentBrush.style.backgroundColor = "rgb(" + red.value + "," + green.value + "," + blue.value + ")";

        changeSliderColor();
    }
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

function convertToVal(hexcode)
{
    const bit16 = valMap.get(hexcode.substring(0, 1));
    const bit1 = valMap.get(hexcode.substring(1, 2));
    // console.log(bit16 + ", "+ bit1);
    return bit16 * 16 + bit1;
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
    // console.log("saved, " + aElement.href);
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
    drawing.addLayer(layerSelected, context.getImageData(0, 0, canvas.width, canvas.height), isBefore);
    document.getElementById("currentLayerSelected").value = drawing.getCurrentIndex();
    changeColor();
}

function changeLayer()
{
    console.log("here, " + drawing.getNumLayers());
    let layerSelected = document.getElementById("currentLayerSelected").value;
    const LAYER_REGEX = new RegExp("[0-9]+")
    if (layerSelected >= 0 && 
        layerSelected <= drawing.getNumLayers() - 1
       && LAYER_REGEX.test(layerSelected))
    {
        console.log("creating layer");
        drawing.selectLayer(parseInt(layerSelected));
        context.clearRect(0, 0, canvas.width, canvas.height);      
        context.putImageData(drawing.getCurrentData(), 0, 0);
            changeColor();
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
        changeColor();

    document.getElementById("currentLayerSelected").value = drawing.getCurrentIndex();
       
}