class CompleteCanvas
{
    IS_DISABLED_INDEX = 0;
    DATA_INDEX = 1; 
    
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
        this.addLayer(0, this.selectedCanvasData)
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
        // console.log(this.currentIndex);
        let layerView = this.menu.children[this.currentIndex].children[0];
        // console.log(layerView);
        let sampleCanvas = document.createElement("canvas");
        sampleCanvas.getContext("2d").putImageData(newData, 0, 0);
        layerView.src = sampleCanvas.toDataURL("image/png");
        // console.log(layerView.src);
        
    }
    
    getCompleteDrawing()
    {
        // let c = document.createElement("canvas").getContext("2d");
        // c.height = this.height;
        // c.width = this.width;
                // console.log("__________");

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
                // c.putImageData(this.layers.at(i), 0, 0);
                // console.log("image data for " + i);
                // console.log ("image data for " + i)
            }
        }
        // for (let i = 0; i < this.layers.length; i++)
        // {
        //     c.putImageData(this.layers.at(i), 0, 0);
            // console.log("image data for " + i);
        //     // console.log ("image data for " + i)
        // }
        // // console.log(this.layers.at(0));
        return image;
    }

    /**
Adding a layer?
*/
    addLayer(position, canvasData)
    {
        let layerInfo = [false, canvasData];
        // console.log(layerInfo);
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
        const layerNumber = position;
        newButton.appendChild(image);
        const oldClassName = "layerButton ";
        newButton.className = oldClassName + "visible";
        console.log(newButton.className);
        newButton.addEventListener("click", function changeLayerSettings()
                                   {
                                       // console.log(layerNumber);
                                        
                                        canvas.layers.at(layerNumber)[canvas.IS_DISABLED_INDEX] = 
                                                !canvas.layers.at(layerNumber)[canvas.IS_DISABLED_INDEX];
                                        newButton.className = oldClassName + ((canvas.layers.at(layerNumber)[canvas.IS_DISABLED_INDEX])? "invisible" : "visible");
                                        console.log(newButton.className);

                                       canvas.listener.changedCanvas();
                                   });
        
        this.menu.appendChild(newButton);
        // console.log(this.newButton.width);
        this.currentIndex++;
        // console.log(this.currentIndex);
        // console.log( "E");
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
            
            // let currentNewImageIndex = 0;
            // for (let j = 0; j < this.width * this.length * 4; j++)
            // {
            //     for (let k = 0; k < this.width * 4; k += 4)
            //     {
            //         let currentSpot = j + k;
            //         newImage.data[currentNewImageIndex] = layerImg.data[currentSpot];
            //         newImage.data[currentNewImageIndex + 1] = layerImg.data[currentSpot + 1];
            //         newImage.data[currentNewImageIndex + 2] = layerImg.data[currentSpot + 2];
            //         newImage.data[currentNewImageIndex + 3] = layerImg.data[currentSpot + 3];
            //         currentNewImageIndex += 4;
            //     }        
            //     currentNewImageIndex += (newWidth - this.width) * 4;
            // }
            this.layers.at(i)[this.DATA_INDEX] = newImage;
            
            // layerImg.width = newWidth;
            // layerImg.height = newHeight;
            // c.putImageData(this.layers.at(i), 0, 0);
            // console.log("image data for " + i);
            // console.log ("image data for " + i)
        }
        this.width = newWidth;
        this.height = newHeight;
    }

    selectLayer(selectedLayer)
    {
        this.currentIndex = selectedLayer;
    }

    getCurrentData()
    {
        return this.layers.at(this.currentIndex)[this.DATA_INDEX];
    }
    
    getNumLayers()
    {
        return this.layers.length;
    }
}