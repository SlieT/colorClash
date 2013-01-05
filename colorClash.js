(function ($) {
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
            inverse:            false,
            undo:               false,
            reset:              false,
            imageData:          null,
            img:                null,
            canvasExt:          null,
            moveImg:            null,
            resizeImg:          null,

            // callbacks
            create_cb:          null,
            undo_cb:            null,
            reset_cb:           null,
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
            this.variables.canvas        = this.element[0];
            this.variables.canvasContext = this.element[0].getContext('2d');
            this.options.moveImg         = [0, 0];
            this.options.canvasExt       = [0, 0];
            this.variables.undoArray     = [];
            this.variables.imgArray      = [];

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
                self.variables.canvas.width  = self.variables.imgWidth  + self.options.canvasExt[0];
                self.variables.canvas.height = self.variables.imgHeight + self.options.canvasExt[1];
                self.variables.canvasContext.
                    drawImage(tempImg[0], 0 + self.options.moveImg[0], 0 + self.options.moveImg[1]);
    
                self.variables.originalImageData = self.variables.canvasContext.
                    getImageData(0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.variables.imgWidth, self.variables.imgHeight);
                
                if (self.options.resizeImg !== null) {
                    self.variables.canvasContext.save();
                    self.variables.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
                    self.variables.canvasContext.clearRect(0, 0, self.variables.canvas.width, self.variables.canvas.height);
                    self.variables.canvasContext.restore();

                    self.variables.canvasContext.
                        drawImage(tempImg[0], 0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.options.resizeImg[0], self.options.resizeImg[1]);

                    self.options.imageData = self.variables.canvasContext.
                        getImageData(0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.options.resizeImg[0], self.options.resizeImg[1]);

                } else {
                    self.options.imageData = self.variables.canvasContext.
                        getImageData(0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.variables.imgWidth, self.variables.imgHeight);
                    self.options.resizeImg = [];
                    self.options.resizeImg[0] = self.variables.imgWidth;
                    self.options.resizeImg[1] = self.variables.imgHeight;
                }
                
                self._flipImg();
                self._manipulateImg();
                self._trigger("create_cb");
                self.variables.imgArray.push([self.options.img, tempImg]);
            });
        },

        // Use the _setOption method to respond to changes to options
        _setOption: function (key, value) {
        ////////////////////
            var manipulate = false;
            switch (key) {
                case "red":
                    this.variables.undoArray.push("red", this.options.red);
                    manipulate = true;
                    break;
                case "green":
                    this.variables.undoArray.push("green", this.options.green);
                    manipulate = true;
                    break;
                case "blue":
                    this.variables.undoArray.push("blue", this.options.blue);
                    manipulate = true;
                    break;
                case "lighten":
                    this.variables.undoArray.push("lighten", this.options.lighten);
                    manipulate = true;
                    break;
                case "saturate":
                    if (value > 1) { value = 1; }
                        else if (value < 0) { value = 0; }
                        this.variables.undoArray.push("saturate", this.options.saturate);
                        manipulate = true;
                    break;
                case "temperature":
                    this.variables.undoArray.push("temperature", this.options.temperature);
                    manipulate = true;
                    break;
                case "coloring":
                    this.variables.undoArray.push("coloring", this.options.coloring);
                    manipulate = true;
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
                case "inverse":
                    this.variables.undoArray.push("inverse", this.options.inverse);
                    manipulate = true;
                    break;
                case "undo":
                    this.undo(value);
                    manipulate = true;
                    break;
                case "reset":
                    this._reset(value);
                    break;
                case "imageData":
                    this._imageData(value);
                    if (value !== undefined) {
                        return;
                    }
                    manipulate = true;
                    break;
                case "img":
                    this.variables.undoArray.push("img", this.options.img);
                    this._img(value);
                    manipulate = true;
                    break;
                case "canvasExt":
                    if (value[0] < 0 && this.variables.imgWidth - (-1 * value[0]) < 0 ) { value[0] = -1 * this.variables.imgWidth; }
                    this.variables.canvas.width  = this.variables.imgWidth  + value[0];
                    if (value[1] < 0 && this.variables.imgHeight - (-1 * value[1]) < 0 ) { value[1] = -1 * this.variables.imgHeight; }
                    this.variables.canvas.height = this.variables.imgHeight  + value[1];
                    manipulate = true;
                    break;
                case "moveImg":
                    this.variables.canvasContext.clearRect(0, 0, this.variables.canvas.width, this.variables.canvas.height);
                    this.variables.canvasContext.putImageData(this.options.imageData, value[0], value[1]);
                    break;
                case "resizeImg":
                    this.variables.undoArray.push("resizeImg", this.options.resizeImg);
                    this.options.resizeImg = value;
                    this._resizeImg();
                    manipulate = true;
                    break;
            }
            $.Widget.prototype._setOption.apply(this, arguments);

            if (manipulate === true) {
                this._manipulateImg();
            }
        },

        // Undo last action - everything that you can undo should work correctly
        undo: function (value) {
        ////////////////////
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
                    if (action === "inverse") {
                        this.options.inverse = value;
                        this._manipulateImg();
                    }
                    if (action === "img") {
                        this.options.img = value;
                        this._img(value);
                    }
                    if (action === "resizeImg") {
                        this.options.resizeImg = value;
                        this._resizeImg(value);
                    }
                    this.variables.undoArray.pop();
                    this.variables.undoArray.pop();
                }
            }
        },

        // Reset everything
        _reset: function(value) {
        ////////////////////
            if (value === true) {
                this.options.red               = 0;
                this.options.green             = 0;
                this.options.blue              = 0;
                this.options.lighten           = 0;
                this.options.saturate          = 1;
                this.options.temperature       = 0;
                this.options.coloring          = 0;
                this.options.vertical          = false;
                this.options.horizontal        = false;
                this.options.inverse           = false;
                this.options.undo              = false;
                this.options.reset             = false;
                this.options.imageData         = null;
                this.options.img               = this.variables.imgArray[0][0];
                this.options.canvasExt         = [0, 0];
                this.options.moveImg           = [0, 0];
                this.options.resizeImg         = [this.options.img[1], this.options.img[2]];
    
                this.variables.curImg            = null;
                this.variables.imgSrc            = null;
                this.variables.imgWidth          = null;
                this.variables.imgHeight         = null;
                //this.variables.canvas            = null;
                //this.variables.canvasContext     = null;
                this.variables.originalImageData = null;
                this.variables.undoArray         = [];
                this.variables.imgArray          = [];
                this._img(this.options.img);
    
                this._trigger("reset_cb");
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
            countOfPixels               = this.options.resizeImg[0] * this.options.resizeImg[1] * 4;
            tempOriginalImageData_data  = this.variables.originalImageData.data;
            tempImageData_data          = this.options.imageData.data;

            constR = this.options.red   + this.options.lighten + this.options.temperature + this.options.coloring;
            constG = this.options.green + this.options.lighten                            - this.options.coloring;
            constB = this.options.blue  + this.options.lighten - this.options.temperature + this.options.coloring;

            var inv = 0, erse = 1;
            if (this.options.inverse === true) {
                inv = 255, erse = -1;
            }

            while (countOfPixels) {
                countOfPixels -= 4;

                newR = inv + erse * tempOriginalImageData_data[countOfPixels]     + constR;
                newG = inv + erse * tempOriginalImageData_data[countOfPixels + 1] + constG;
                newB = inv + erse * tempOriginalImageData_data[countOfPixels + 2] + constB;

                greyscaleIntensity = 0.3 * newR + 0.59 * newG + 0.11 * newB;

                tempImageData_data[countOfPixels]     = (greyscaleIntensity * (1 - tempSaturate) + newR * tempSaturate);
                tempImageData_data[countOfPixels + 1] = (greyscaleIntensity * (1 - tempSaturate) + newG * tempSaturate);
                tempImageData_data[countOfPixels + 2] = (greyscaleIntensity * (1 - tempSaturate) + newB * tempSaturate);
                
            }
            this.options.imageData.data = tempImageData_data;
            this.variables.canvasContext.
                putImageData(this.options.imageData, 0 + this.options.moveImg[0], 0 + this.options.moveImg[1], 0, 0, this.options.resizeImg[0], this.options.resizeImg[1]);
            this._trigger("manipulation_cb");
        },

        // Flip the image
        _flipImg: function() {
        ////////////////////
            var ver = 1,
                hor = 1,
                width = this.options.resizeImg[0],
                height = this.options.resizeImg[1];

            if (this.options.vertical) { ver = -1; height = 0; }
            if (this.options.horizontal) { hor = -1; width = 0; }
            if (this.options.vertical && this.options.horizontal) { width = this.options.resizeImg[0]; height = this.options.resizeImg[1]; }
            if (!this.options.vertical && !this.options.horizontal) { width = 0; height = 0; }

            this.variables.canvasContext.save();
            this.variables.canvasContext.clearRect(0, 0, this.variables.canvas.width, this.variables.canvas.height);
            this.variables.canvasContext.scale(ver, hor);
            this.variables.canvasContext.
                drawImage(this.variables.curImg[0], (ver * width) + (ver * this.options.moveImg[0]),
                    (hor * height) + (hor * this.options.moveImg[1]), this.options.resizeImg[0], this.options.resizeImg[1]);
            this.variables.canvasContext.restore();
            this.variables.originalImageData =
                this.variables.canvasContext.getImageData(0 + this.options.moveImg[0], 0 + this.options.moveImg[1], this.options.resizeImg[0], this.options.resizeImg[1]);
        },

        // Resize the image
        _resizeImg: function () {
        ////////////////////
            this.variables.canvasContext.save();
            this.variables.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
            this.variables.canvasContext.clearRect(0, 0, this.variables.canvas.width, this.variables.canvas.height);
            this.variables.canvasContext.restore();

            this.variables.canvasContext.
                drawImage(this.variables.curImg[0], 0 + this.options.moveImg[0], 0 + this.options.moveImg[1], this.options.resizeImg[0], this.options.resizeImg[1]);
            this._flipImg();
            this.variables.originalImageData = this.variables.canvasContext.
                getImageData(0 + this.options.moveImg[0], 0 + this.options.moveImg[1], this.options.resizeImg[0], this.options.resizeImg[1]);
            this.options.imageData = this.variables.canvasContext.
                getImageData(0 + this.options.moveImg[0], 0 + this.options.moveImg[1], this.options.resizeImg[0], this.options.resizeImg[1]);

        },

        ////////////////////
        _imageData: function (value) {
        ////////////////////
            if(value !== undefined) {
                console.log("Needs to be correctly implemented, till now this widget needs images ... sorry, but" +
                   " of course you can get the imageData via $( '#canvas' ).imgManipulation(\"option\", \"imageData\");");
            }
        },

        // Apply the new image
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
                self.variables.canvas.width  = self.variables.imgWidth  + self.options.canvasExt[0];
                self.variables.canvas.height = self.variables.imgHeight + self.options.canvasExt[1];
                self.variables.canvasContext.
                    drawImage(tempImg[0], 0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.options.resizeImg[0], self.options.resizeImg[1]);
    
                self.variables.originalImageData = self.variables.canvasContext.
                    getImageData(0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.options.resizeImg[0], self.options.resizeImg[1]);
                self.options.imageData = self.variables.canvasContext.
                    getImageData(0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.options.resizeImg[0], self.options.resizeImg[1]);
    
                self._flipImg();
                self._manipulateImg();
                self.variables.imgArray.push([value, tempImg]);
            });
        },

        // Use the destroy method to clean up any modifications your widget has made to the DOM
        destroy: function () {
        ////////////////////
            this.variables.curImg.remove();
            this.variables.undoArray.remove();
            this.variables.imgArray.remove();
            this.options.canvasExt.remove();
            this.options.moveImg.remove();
            this.options.resizeImg.remove();
            this.element.unbind("create_cb");
            this.element.unbind("undo_cb");
            this.element.unbind("manipulation_cb");

          $.Widget.prototype.destroy.call(this);
        }
    });
}(jQuery));