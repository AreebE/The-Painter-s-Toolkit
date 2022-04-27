class CompleteCanvas
{
    IS_DISABLED_INDEX = 0;
    DATA_INDEX = 1; 

    BASIC_BUTTON_CLASS = "layerButton";
    DISABLED_CLASS = "invisible";
    ENABLED_CLASS = "visible";
    SELECTED_CLASS = "selected";
    
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

    getLength()
    {
        return this.layers.length;
    }

    getCurrentIndex()
    {
        return this.currentIndex;
    }

    updateData(newData)
    {
        // console.log(this.currentIndex);
        this.layers.at(this.currentIndex)[this.DATA_INDEX] = newData;
        console.log(this.currentIndex);
        let layerView = this.menu.children[this.currentIndex].children[0];
        // console.log(layerView);
        // console.log(this.curren)
        let sampleCanvas = document.createElement("canvas");
        sampleCanvas.getContext("2d").putImageData(newData, 0, 0);
        layerView.src = sampleCanvas.toDataURL("image/png");
        // console.log(layerView.src);
        
    }
    
    getCompleteDrawing()
    {
          // console.log(this.layers.length); 
        let image = new ImageData(this.width, this.height);
        // console.log(image.height + ", " + image.width);
        for (let i = 0; i < image.data.length; i+= 4)
        {
            for (let j = 0; j < this.layers.length; j++)
            {
                
                
                let layerInfo = this.layers.at(j);
                // console.log(layerInfo[this.IS_DISABLED_INDEX] + " at " + j );
                                                // console.log(layerInfo);
                // if (i == image.data.length - 4)
                // {
                    // console.log(layerInfo[this.IS_DISABLED_INDEX] + " at " + j );
                // }
                // console.log(layerInfo)
                let layerImg = layerInfo[this.DATA_INDEX];
        
                if (layerImg.data[i + 3] != 0
                   && !layerInfo[this.IS_DISABLED_INDEX])
                {
                    // console.log(layerImg.data[i]);
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
Adding a layer?
*/
    addLayer(position, canvasData, addingBeforeLayer)
    {
        let layerInfo = [false, canvasData];
        // console.log(position + " eeee");
        // console.log(layerInfo);
        this.layers.splice(position, 0, layerInfo);
                // console.log(this.layers.at(0)[1].data);

        let newButton = document.createElement("button");
        let image = document.createElement("img");
        image.className = "layerDisplay";
        // let menuItem = document.createElement("menuitem");
        let sampleCanvas = document.createElement("canvas");
        // console.log("test data type: " + canvasData);
        sampleCanvas.getContext("2d").putImageData(canvasData, 0, 0);
        image.src = sampleCanvas.toDataURL("image/png");
        // menuItem.style.width = "100px";
        // menuItem.style.height = "100px";
        const canvas = this;
        newButton.appendChild(image);
        const oldClassName = this.BASIC_BUTTON_CLASS + " ";
        newButton.className = oldClassName + "visible";
        console.log(newButton.className);
        newButton.addEventListener("click", function changeLayerSettings()
                                   {
                                       // console.log(layerNumber);
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

    selectLayer(selectedLayer)
    {
        // console.log(" aaaa");
        this.selectLayerAdvanced(selectedLayer, false);
    }

    selectLayerAdvanced(selectedLayer, isBeforeLayer)
    {
        console.log(isBeforeLayer + ", " + selectedLayer);
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

    getCurrentData()
    {
        return this.layers.at(this.currentIndex)[this.DATA_INDEX];
    }
    
    getNumLayers()
    {
        return this.layers.length;
    }

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

    clearLayer(layerSelected)
    {
        this.layers.at(layerSelected)[this.DATA_INDEX] = new ImageData(this.width, this.height);
        this.listener.changedCanvas();
        this.updateData(this.layers.at(layerSelected)[this.DATA_INDEX]);
    }
}