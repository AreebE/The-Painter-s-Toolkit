class Palette
{
    constructor(menu, listener)
    {
        this.menu = menu;
        this.listener = listener;
    }

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