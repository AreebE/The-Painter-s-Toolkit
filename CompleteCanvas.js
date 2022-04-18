class CompleteCanvas
{
       constructor(firstCanvasData, width, height)
    {
        this.layers = new Array();
        this.currentIndex = 0;
        this.selectedCanvasData = firstCanvasData;        
        this.width = width;
        this.height = height; 
        this.addLayer(this.currentIndex, this.selectedCanvasData)
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
        this.layers[this.currentIndex] = newData;
    }
    
    getCompleteDrawing()
    {
        // let c = document.createElement("canvas").getContext("2d");
        // c.height = this.height;
        // c.width = this.width;
        let image = new ImageData(this.width, this.height);
        // console.log(image.height + ", " + image.width);
        for (let i = 0; i < image.data.length; i+= 4)
        {
            for (let j = 0; j < this.layers.length; j++)
            {
                let layerImg = this.layers.at(j);
                                // console.log(layerImg.height);

                if (layerImg.data[i + 3] != 0)
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
        //     console.log("image data for " + i);
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
        this.layers.splice(position, 0, canvasData);
        // console.log(this.layers + "E");
    }

    resize(newWidth, newHeight)
    {
    
        for (let i = 0; i < this.layers.length; i++)
        {
            let newImage = new ImageData(newWidth, newHeight);
            let layerImg = this.layers.at(i);
            let currentNewImageIndex = 0;
            for (let j = 0; j < this.width * this.length * 4; j++)
            {
                for (let k = 0; k < this.width * 4; k += 4)
                {
                    let currentSpot = j + k;
                    newImage.data[currentNewImageIndex] = layerImg.data[currentSpot];
                    newImage.data[currentNewImageIndex + 1] = layerImg.data[currentSpot + 1];
                    newImage.data[currentNewImageIndex + 2] = layerImg.data[currentSpot + 2];
                    newImage.data[currentNewImageIndex + 3] = layerImg.data[currentSpot + 3];
                    currentNewImageIndex += 4;
                }        
                currentNewImageIndex += (newWidth - this.width) * 4;
            }
            // layerImg.width = newWidth;
            // layerImg.height = newHeight;
            // c.putImageData(this.layers.at(i), 0, 0);
            // console.log("image data for " + i);
            // console.log ("image data for " + i)
        }
        this.width = newWidth;
        this.height = newHeight;
    }
    
}