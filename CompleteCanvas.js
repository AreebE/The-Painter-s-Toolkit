/**
* A class for showing the complete drawing
*/
class CompleteCanvas
{
    IS_DISABLED_INDEX = 0;
    DATA_INDEX = 1; 

    BASIC_BUTTON_CLASS = "layerButton";
    DISABLED_CLASS = "invisible";
    ENABLED_CLASS = "visible";
    SELECTED_CLASS = "selected";
    /**
    * A basic constructor for creating this object
    * 
    * @param    firstCanvasData    the first image data object to use.
    * @param    width    the initial width of the canvas
    * @param    height    the initial height of the canvas.
    * @param    menu     the menu to display all the layers in.
    * @param    listener    the main script to notify it of major changes, like deleting or selecting a layer.
    */
    constructor(firstCanvasData, width, height, menu, listener)
    {
        console.log(listener);
        this.listener = listener;
        this.layers = new Array();
        this.currentIndex = -1;
        this.selectedCanvasData = firstCanvasData;        
        this.width = width;
        this.height = height; 
        this.menu = menu;
        this.addLayer(0, this.selectedCanvasData, false)
        
        // console.log(this.layers.at(0)[1]);     
    }

    /**
    * Get the length of the canvas. 
    *
    * @return the length of this drawing in pixels.
    */
    getLength()
    {
        return this.layers.length;
    }

    /**
    * Get the index of what layer is selected now.
    *
    * @return the index of the selected layer
    */
    getCurrentIndex()
    {
        return this.currentIndex;
    }

    /**
    * Update the data of this layer. It also updates the image of the button.
    *
    * @param newData the new data to add.
    */
    updateData(newData)
    {
        this.layers.at(this.currentIndex)[this.DATA_INDEX] = newData;
        let layerView = this.menu.children[this.currentIndex].children[0];
        let sampleCanvas = document.createElement("canvas");
        sampleCanvas.getContext("2d").putImageData(newData, 0, 0);
        layerView.src = sampleCanvas.toDataURL("image/png");        
    }

    /**
    * Get what the complete drawing (all of the visible layers combined) would look like.
    *
    * @return an image data object containing all of the layers.
    */
    getCompleteDrawing()
    {
        let image = new ImageData(this.width, this.height);
        for (let i = 0; i < image.data.length; i+= 4)
        {
            for (let j = 0; j < this.layers.length; j++)
            {
                let layerInfo = this.layers.at(j);
                let layerImg = layerInfo[this.DATA_INDEX];
        
                if (layerImg.data[i + 3] != 0
                   && !layerInfo[this.IS_DISABLED_INDEX])
                {
                    image.data[i] = layerImg.data[i];
                    image.data[i + 1] = layerImg.data[i + 1];
                    image.data[i + 2] = layerImg.data[i + 2];
                    image.data[i + 3] = 255;
                }
             }
        }
         return image;
    }

    /**
    * Add a layer to the canvas at the given position. All layers that come after this one will have their position adjusted by 1.
    * Also add a button that switches the layer from invisible to visible when clicked.
    * Lastly, select the added layer as the current one. 
    *
    * @param position the position this layer will be added at.
    * @param canvasData
    */
    addLayer(position, canvasData, addingBeforeLayer)
    {
        let layerInfo = [false, canvasData];
        this.layers.splice(position, 0, layerInfo);

        let newButton = document.createElement("button");
        let image = document.createElement("img");
        image.className = "layerDisplay";
        let sampleCanvas = document.createElement("canvas");
        sampleCanvas.getContext("2d").putImageData(canvasData, 0, 0);
        image.src = sampleCanvas.toDataURL("image/png");
        const canvas = this;
        newButton.appendChild(image);
        const oldClassName = this.BASIC_BUTTON_CLASS + " ";
        newButton.className = oldClassName + "visible";
        console.log(newButton.className);
        
        newButton.addEventListener("click", function changeLayerSettings()
                                   {
                                        const layerNumber = canvas.findButton(newButton);                                        
                                        canvas.layers.at(layerNumber)[canvas.IS_DISABLED_INDEX] = 
                                                !canvas.layers.at(layerNumber)[canvas.IS_DISABLED_INDEX];
                                        const visibilityClass = ((canvas.layers.at(layerNumber)[canvas.IS_DISABLED_INDEX])? canvas.DISABLED_CLASS: canvas.ENABLED_CLASS) + " "; 
                                        const selectedClass = (layerNumber == canvas.currentIndex)? canvas.SELECTED_CLASS: "";
                                        newButton.className = oldClassName + visibilityClass + selectedClass;
                                        console.log(selectedClass + " " + canvas.currentIndex + " " + layerNumber); 
                                        console.log(newButton.className);

                                       canvas.listener.changedCanvas();
                                   });
        if (position == this.menu.children.length)
        {
            this.menu.appendChild(newButton);
        }
        else  
        {
            let prevButton = this.menu.children[position];
            this.menu.insertBefore(newButton, prevButton);
        }
        // console.log(position + ", " +  addingBeforeLayer);
        this.selectLayerAdvanced(position, addingBeforeLayer);
        // console.log(position + " \n" + this.layers.at(0));
     }

    /**
    * A method to search for a button's position in the menu, which corresponds to the layer at that position.
    *
    * @return the index of the button (and the layer it represents).
    */
    findButton(buttonToCheck)
    {
        for (let i = 0; i < this.menu.children.length; i++)
        {
            if (this.menu.children[i] == buttonToCheck)
            {
                return i;
            }
        }
        return 0;        
    }

    /**
    * Resize the canvas, deleting any pixels that go beyond the new size.
    * @param    newWidth    the new width of this drawing.
    * @param    newHeight    the new height of this drawing.
    */
    resize(newWidth, newHeight)
    {
        for (let i = 0; i < this.layers.length; i++)
        {
            let newImage = new ImageData(newWidth, newHeight);
            let layerImg = this.layers.at(i)[this.DATA_INDEX];
            
            for (let j = 0; j < newImage.width * newImage.length * 4; j+= newImage.width * 4)
            {
                for (let k = 0; k < newImage.width * 4; k += 4)
                {
                    let sum = j + k;

                    if (k == newImage.width * 4 - 4)
                    {
                        console.log(sum + ", " + layerImg.data[sum]); 
                        console.log(sum + 1 + ", " + layerImg.data[sum + 1]); 
                        console.log(sum + 2 + ", " + layerImg.data[sum + 2]); 
                        console.log(sum + 3 + ", " + layerImg.data[sum + 3]); 

                    }
                    newImage.data[sum] = layerImg.data[sum];
                    newImage.data[sum + 1] = layerImg.data[sum + 1];
                    newImage.data[sum + 2] = layerImg.data[sum + 2];
                    newImage.data[sum + 3] = layerImg.data[sum + 3];
                }        
            }
            
       this.layers.at(i)[this.DATA_INDEX] = newImage;
       }
        this.width = newWidth;
        this.height = newHeight;
    }

    /**
    * Select a layer
    * 
    * @param    selectedLayer    the position of the layer
    */
    selectLayer(selectedLayer)
    {
        // console.log(" aaaa");
        this.selectLayerAdvanced(selectedLayer, false);
    }

    /**
    * Select a layer while deselecting the previous layer.
    * @param    selectedLayer    the positon of the new layer.
    * @param    isBeforeLayer     if the layer after the current layer one needs to be deselected. This would occur when adding a layer.
    */
    selectLayerAdvanced(selectedLayer, isBeforeLayer)
    {
        // console.log(isBeforeLayer + ", " + selectedLayer);
        if (this.currentIndex != -1)
        {
            try 
            {
                const position = this.currentIndex + parseInt((isBeforeLayer)? 1: 0);
                // console.log(this.currentIndex + 1);
                // console.log(" \"" + position + "\" " + this.layers.at(position));
                const oldVisibilityClass = (this.layers.at(position)[this.IS_DISABLED_INDEX])? this.DISABLED_CLASS: this.ENABLED_CLASS;
                // console.log(this.menu.children[position].className);
                this.menu.children[position].className = this.BASIC_BUTTON_CLASS + " " + oldVisibilityClass;    
                // console.log(oldVisibilityClass + ", " + position + " , " + this.layers.at(position)[this.IS_DISABLED_INDEX]);
        
            } catch (error)
            {
                // occurs when the layer that was trying to be selected is actually deleted.
            }
        }
        this.currentIndex = selectedLayer;
        const visibilityClass = (this.layers.at(this.currentIndex)[this.IS_DISABLED_INDEX])? this.DISABLED_CLASS: this.ENABLED_CLASS;
        this.menu.children[this.currentIndex].className = this.BASIC_BUTTON_CLASS + " " + visibilityClass + " " + this.SELECTED_CLASS;
    }

    /**
    * Get the image data at the selected layer.
    * @return an ImageData object.
    */
    getCurrentData()
    {
        return this.layers.at(this.currentIndex)[this.DATA_INDEX];
    }

    /**
    * Get the total amount of layers in this drawing.
    * @return number of layers.
    */
    getNumLayers()
    {
        return this.layers.length;
    }

    /**
    * Delete the layer at the given position, and select the one that would replace that one, if possible. If not, then select the one before.
    * @param layerSelected the layer to select.
    */
    deleteLayer(layerSelected)
    {
        this.layers.splice(layerSelected, 1);
        let childToRemove = this.menu.children[layerSelected];
        this.menu.removeChild(childToRemove);
        this.selectLayer(((layerSelected == this.layers.length)? this.layers.length - 1: layerSelected));
        console.log(this.layers.length + ", " + layerSelected);
        console.log(this.currentIndex);
        this.listener.changedCanvas();
    }

    /**
    * Clear the layer at this position
    * @param layerSelected the layer to clear.
    */
    clearLayer(layerSelected)
    {
        this.layers.at(layerSelected)[this.DATA_INDEX] = new ImageData(this.width, this.height);
        this.listener.changedCanvas();
        this.updateData(this.layers.at(layerSelected)[this.DATA_INDEX]);
    }
}