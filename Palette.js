/**
 * A class for colors.
*/
class Palette
{
    /**
    * A basic constructor.
    * @param    menu    the menu to add colors to.
    * @param    listener    the main script to respond to events.
    */
    constructor(menu, listener)
    {
        this.menu = menu;
        this.listener = listener;
    }

    /**
    * Add the color given to it to the palette. Add a button to the menu that, when clicked, changes the canvas's current color.
    * @param    hexcode    the color hexcode to add
    */
    addColor(hexcode)
    {
        const thisHexcode = hexcode;
        const palette = this;
        let colorButton = document.createElement("button");
        colorButton.className = "paletteButton";
        colorButton.style.background = hexcode;
        colorButton.addEventListener(
            "click",
            function addHexcode()
            {
                palette.listener.passHexcode(thisHexcode);   
            }
        );
        this.menu.appendChild(colorButton);
    }
    
}