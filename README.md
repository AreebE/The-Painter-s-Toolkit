# The Painter's Toolkit

A web application for creating your own drawing, then saving it.

# Features:
____

Canvas:
-- 

There are two canvas side by side of each other.

The first will display the layer you are currently on. To adjust this, check the 'layers' feature. You draw on this canvas by dragging your mouse over it.

The second will display what the drawing will look like, based on what layers are enabled or disabled. When saving the image, it would show what it would look like.
____

Canvas Settings:
--

The width and height are those of the canvas. It will only accept numbers that are above 50. The canvas will only be resized once the width is clicked. Be aware that at larger sizes, the program will slow down and not draw the lines as you may wish.
The stroke adjusts how thick the pen, blender, and eraser brushes will be. It must be at least 1. The change is only recorded once the button is pressed.

___

Brushes:
--
<img src="images/brushMenu"></img>

There are four different brushes available:
- **Pen --** Simply draw a line with the color your brush is set to.
- **Eraser --** Erase the lines on the layer you are at.
- **Blender --** Drawing any lines on the canvas will cause your current color and the lines on the canvas to be 'blended' together. The official way this works is that it adds the rgb values of the color you used and the color on the image, then returns a pixel of that color.
- **Stamp --** This requires a bit of set up in the stamp menu. Once a proper image is found, it will be printed on the the canvas. Keep in mind this will follow a 1-1 ratio, where each pixel on the image is printed onto the canvas.
A brush is selected once it is green.
The stamp button will only work once a proper image is uploaded.

Stamp menu:

This is for uploading an image. To do so, simply click on the upload file link, then select a .png image in your files. You can click the 'confirm image' button to ensure that the image has been properly uploaded.
____

Palette:
--
This allows you to adjust the colors of both your brush and your palette.

The palette acts as a convienience option. When a colored button on the palette is pressed, it sets your current brush color to the color on the button. It also changes the color displayed in the slider menu so you can see its hexcode.
Colors are added to the palette when the 'add to palette' button is clicked.

The sliders are used to see the range of colors possible. Each slider has a gradient, which changes when sliding. This gradient is calculated by using the current color of the hashcode, then the endpoints of the sliders.
* For example, if you have a hashcode of #AF38BB (or rgb values of 175, 53, 187):
   * The endpoints of the red slider would be rgb(0, 53, 187) and rgb(255, 53, 187)
   * The endpoints of the green slider would be rgb(175, 0, 187) and rgb(175, 255, 187)
   * The endpoints of the blue slider would be rgb(175, 53, 0) and rgb(175, 53, 255)
* This will update the color displayed in the color menu and the hashcode, but it will _not_ change the color of the brush. That is only done when hitting the 'confirm color' button.
* You can write values in the hashcode textbox if you have a color you wish to add. Keep in mind letters must be capitalized and only six letters hashcodes are allowed. Only rgb hashcodes are allowed, not myc, agrb, or other such types.
____

Layers:
--
* You select a layer by inserting the number of the layer. Keep in mind that the first layer is '0'. Also, if the program cannot find this layer, then the currently selected layer remains chosen.
  * When a layer is selected, it also replaces the current canvas with the data it had.
* You can either add or remove a layer before the one you have selected. This will add a button to the layer menu and set your selected layer to the newly created one.
* Deleting a layer will completely remove the one you have selected. Upon doing so, your selected layer becomes the one that now takes its spot. If no such spot exists, then the previous layer is selected.
  * If there is only one layer left and the delete button is pressed, then it is merely cleared.

The buttons:
* Each layer is represented by a button on the lower menu, which has three different settings: Selected, Disabled, and Enabled.
* This button will display a part of the image, not the full version.
  * Selected layers appear green and there can only be one layer selected at any time. 
  * Enabled layers appear yellow, signifying that the layer is visible on the complete drawing.
  * Disabled layers appear gray, signifying that the layer is now invisible.
Clicking on a button will set it from enabled to disabled and vica-versa. However, a selected layer will always take priority over a disabled or enabled layer.

____

Saving:
--

Just two items: A link and a textbox. 
* Filling the textbox will let the program know the name of the file you want to save it as.
* Clicking the link will officially save the image as a .png.
