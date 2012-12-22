(function ($) {
    //"use strict";
    $.widget("cc.colorClash", {

        // These options will be used as defaults
        options: {
            red:                0,
            green:              0,
            blue:               0,
            lighten:            0,
            saturate:           1,
            temperature:        0,
            coloring:           0,
            vertical:           false,
            horizontal:         false,
            undo:               false,
            imageData:          null,
            img:                null,
            canvasWidthExt:     0,
            canvasHeightExt:    0,
            // callbacks
            create_cb:          null,
            undo_cb:            null,
            manipulation_cb:    null
        },

        variables: {
            curImg:             null,
            imgSrc:             null,
            imgWidth:           0,
            imgHeight:          0,
            canvas:             null,
            canvasContext:      null,
            originalImageData:  null,
            undoArray:          null,
            imgArray:           null
        },

        // Set up the widget
        _create: function () {
        ////////////////////
            this.variables.canvas = this.element[0];
            this.variables.canvasContext = this.element[0].getContext('2d');
            this.variables.undoArray = [];
            this.variables.imgArray = [];

            var tempImg = $("<img/>");
            this.variables.imgSrc       = this.options.img[0];
            this.variables.imgWidth     = this.options.img[1];
            this.variables.imgHeight    = this.options.img[2];
            tempImg.attr({
                src:    this.options.img[0],
                width:  this.options.img[1],
                height: this.options.img[2]
            });
            this.variables.curImg = tempImg;

            var self = this;
            tempImg.load( function() {
                self.variables.canvas.width  = self.variables.imgWidth  + self.options.canvasWidthExt;
                self.variables.canvas.height = self.variables.imgHeight + self.options.canvasHeightExt;
                self.variables.canvasContext.drawImage(tempImg[0], 0, 0);
                self.variables.originalImageData = self.variables.canvasContext.getImageData(0, 0, self.variables.imgWidth, self.variables.imgHeight);
                self.options.imageData = self.variables.canvasContext.getImageData(0, 0, self.variables.imgWidth, self.variables.imgHeight);
                self._flipImg();
                self._manipulateImg();
                self._trigger("create_cb");
                self.variables.imgArray.push([self.options.img, tempImg]);
            });
        },

        // Use the _setOption method to respond to changes to options
        _setOption: function (key, value) {
        ////////////////////
            switch (key) {
                case "red":
                    this.variables.undoArray.push("red", this.options.red);
                    break;
                case "green":
                    this.variables.undoArray.push("green", this.options.green);
                    break;
                case "blue":
                    this.variables.undoArray.push("blue", this.options.blue);
                    break;
                case "lighten":
                    this.variables.undoArray.push("lighten", this.options.lighten);
                    break;
                case "saturate":
                    if (value > 1) { value = 1; }
                        else if (value < 0) { value = 0; }
                        this.variables.undoArray.push("saturate", this.options.saturate);
                    break;
                case "temperature":
                    this.variables.undoArray.push("temperature", this.options.temperature);
                    break;
                case "coloring":
                    this.variables.undoArray.push("coloring", this.options.coloring);
                    break;
                case "vertical":
                    this.variables.undoArray.push("vertical", this.options.vertical);
                    this.options.vertical = value;
                    this._flipImg();
                    this._manipulateImg();
                    return;
                case "horizontal":
                    this.variables.undoArray.push("horizontal", this.options.horizontal);
                    this.options.horizontal = value;
                    this._flipImg();
                    this._manipulateImg();
                    return;
                case "undo":
                    this.undo(value);
                    break;
                case "imageData":
                    // needs to be implemented correctly
                    this._imageData(value);
                    if (value !== undefined) {
                        return;
                    }
                    break;
                case "img":
                    this.variables.undoArray.push("img", this.options.img);
                    this._img(value);
                    break;
                case "canvasWidthExt":
                    if (value < 0 && this.options.imgWidth - (-1 * value) < 0 ) { value = -1 * this.options.imgWidth; }
                    this.variables.canvas.width  = this.options.imgWidth + value;
                    break;
                case "canvasHeightExt":
                    if (value < 0 && this.options.imgHeight - (-1 * value) < 0 ) { value = -1 * this.options.imgHeight; }
                    this.variables.canvas.height = this.options.imgHeight + value;
                    break;
            }
            $.Widget.prototype._setOption.apply(this, arguments);
            this._manipulateImg();
        },

        // Undo last action
        undo: function (value) {
        ////////////////////
            // getter
            if (value === undefined) {
                return this.options.undo;
            } else {
            // setter
                var action = "";
                this.options.undo = value;
                
                if (value) {
                    
                    if (this.variables.undoArray.length > 0) {

                        action = this.variables.undoArray[this.variables.undoArray.length - 2];
                        value  = this.variables.undoArray[this.variables.undoArray.length - 1];

                        if (action === "red") {
                            this.options.red = value;
                            this._manipulateImg();
                        }

                        if (action === "green") {
                            this.options.green = value;
                            this._manipulateImg();
                        }

                        if (action === "blue") {
                            this.options.blue = value;
                            this._manipulateImg();
                        }

                        if (action === "lighten") {
                            this.options.lighten = value;
                            this._manipulateImg();
                        }

                        if (action === "saturate") {
                            this.options.saturate = value;
                            this._manipulateImg();
                        }

                        if (action === "temperature") {
                            this.options.temperature = value;
                            this._manipulateImg();
                        }

                        if (action === "coloring") {
                            this.options.coloring = value;
                            this._manipulateImg();
                        }

                        if (action === "vertical") {
                            this.options.vertical = value;
                            this._flipImg();
                        }

                        if (action === "horizontal") {
                            this.options.horizontal = value;
                            this._flipImg();
                        }

                        if (action === "img") {
                            this.options.img = value;
                            this._img(value);
                        }

                        this.variables.undoArray.pop();
                        this.variables.undoArray.pop();
                    }
                }

                this._trigger("undo_cb", {}, {name: action});
            }
        },

        // Manipulate the Imagedata
        _manipulateImg: function() {
        ////////////////////
            var newR, newG, newB,
            constR, constG, constB,
            greyscaleIntensity,
            countOfPixels,
            tempSaturate, tempOriginalImageData_data, tempImageData_data;

            newR = newG = newB =
            constR = constG = constB =
            greyscaleIntensity = 0;
            tempSaturate                = this.options.saturate;
            countOfPixels               = this.variables.imgWidth * this.variables.imgHeight * 4;
            tempOriginalImageData_data  = this.variables.originalImageData.data;
            tempImageData_data          = this.options.imageData.data;

            constR = this.options.red   + this.options.lighten + this.options.temperature + this.options.coloring;
            constG = this.options.green + this.options.lighten                            - this.options.coloring;
            constB = this.options.blue  + this.options.lighten - this.options.temperature + this.options.coloring;

            while (countOfPixels) {
                countOfPixels -= 4;
                
                newR = tempOriginalImageData_data[countOfPixels]     + constR;
                newG = tempOriginalImageData_data[countOfPixels + 1] + constG;
                newB = tempOriginalImageData_data[countOfPixels + 2] + constB;

                greyscaleIntensity = 0.3 * newR + 0.59 * newG + 0.11 * newB;

                tempImageData_data[countOfPixels]     = greyscaleIntensity * (1 - tempSaturate) + newR * tempSaturate;
                tempImageData_data[countOfPixels + 1] = greyscaleIntensity * (1 - tempSaturate) + newG * tempSaturate;
                tempImageData_data[countOfPixels + 2] = greyscaleIntensity * (1 - tempSaturate) + newB * tempSaturate;
            }
            this.options.imageData.data = tempImageData_data;
            this.variables.canvasContext.putImageData(this.options.imageData, 0, 0);
            this._trigger("manipulation_cb");
        },

        // flip the image
        _flipImg: function() {
        ////////////////////
            var ver = 1,
                hor = 1,
                width = this.variables.imgWidth,
                height = this.variables.imgHeight;

            if (this.options.vertical) { ver = -1; height = 0; }
            if (this.options.horizontal) { hor = -1; width = 0; }
            if (this.options.vertical && this.options.horizontal) { width = this.variables.imgWidth; height = this.variables.imgHeight; }
            if (!this.options.vertical && !this.options.horizontal) { width = 0; height = 0; }

            this.variables.canvasContext.save();
            this.variables.canvasContext.clearRect(0, 0, this.variables.canvas.width, this.variables.canvas.height);
            this.variables.canvasContext.scale(ver, hor);
            this.variables.canvasContext.drawImage(this.variables.curImg[0], ver * width, hor * height);
            this.variables.canvasContext.restore();
            this.variables.originalImageData = this.variables.canvasContext.getImageData(0, 0, this.variables.imgWidth, this.variables.imgHeight);
        },

        ////////////////////
        _imageData: function (value) {
        ////////////////////
            if(value !== undefined) {
                // do nothing
                console.log("Needs to be correctly implemented, till now this widget needs images ... sorry, but" +
                   " of course you can get the imageData via $( '#canvas' ).imgManipulation(\"option\", \"imageData\");");
            }
        },

        // apply the new image
        _img: function (value) {
        ////////////////////
            var firstTime = true;

            for (var i = this.variables.imgArray.length - 1; i >= 0; i--) {
                if (this.variables.imgArray[i][0][0] === value[0]) {
                    firstTime = false;
                    
                    this.options.img = value;
                    this.variables.imgSrc = value[0];
                    this.variables.imgWidth = value[1];
                    this.variables.imgHeight = value[2];
                    this.variables.curImg = this.variables.imgArray[i][1];
                    this._flipImg();
                    return;
                }
            }

            if (firstTime === false) {
                return;
            }

            var tempImg = $("<img/>");
            this.variables.imgSrc       = value[0];
            this.variables.imgWidth     = value[1];
            this.variables.imgHeight    = value[2];
            tempImg.attr({
                src:    value[0],
                width:  value[1],
                height: value[2]
            });
            this.variables.curImg = tempImg;

            var self = this;
            tempImg.load( function() {
                self.variables.canvas.width  = self.variables.imgWidth  + self.options.canvasWidthExt;
                self.variables.canvas.height = self.variables.imgHeight + self.options.canvasHeightExt;
                self.variables.canvasContext.drawImage(tempImg[0], 0, 0);
                self.variables.originalImageData = self.variables.canvasContext.getImageData(0, 0, self.variables.imgWidth, self.variables.imgHeight);
                self.options.imageData = self.variables.canvasContext.getImageData(0, 0, self.variables.imgWidth, self.variables.imgHeight);
                self._flipImg();
                self._manipulateImg();
                self.variables.imgArray.push([value, tempImg]);
            });
        },

        // Use the destroy method to clean up any modifications your widget has made to the DOM
        destroy: function () {
        ////////////////////
            this.variables.img.remove();
            this.variables.undoArray.remove();
            this.variables.imgArray.remove();
            
            this.element.unbind("create_cb");
            this.element.unbind("undo_cb");
            this.element.unbind("manipulation_cb");

          $.Widget.prototype.destroy.call(this);
        }
    });
}(jQuery));