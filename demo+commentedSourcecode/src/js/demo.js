$(function () {

    // invoke widget
    $( '#kannwas' ).colorClash({
        img:                ["img/Plant.jpg", 800, 480],
        //temperature:        300,
        //horizontal:         true,
        canvasExt:          [200, 200],
        moveImg:            [100, 50],
        undo_cb: function(event, ui) {
            //console.log("do something after an undo was performend");
            if (ui.name === "red") {
                $( "#Red" ).slider( "option", "value",
                                    $( '#kannwas' ).colorClash("option", "red"));
            }
            
            if (ui.name === "green") {
                $( "#Green" ).slider( "option", "value",
                                    $( '#kannwas' ).colorClash("option", "green"));
            }
            
            if (ui.name === "blue") {
                $( "#Blue" ).slider( "option", "value",
                                    $( '#kannwas' ).colorClash("option", "blue"));
            }

            if (ui.name === "lighten") {
                $( "#Lightness" ).slider( "option", "value",
                                    $( '#kannwas' ).colorClash("option", "lighten"));
            }

            if (ui.name === "saturate") {
                $( "#Saturation" ).slider( "option", "value",
                                    $( '#kannwas' ).colorClash("option", "saturate")*100);
            }

            if (ui.name === "coloring") {
                $( "#Color" ).slider( "option", "value",
                                    $( '#kannwas' ).colorClash("option", "coloring"));
            }

            if (ui.name === "temperature") {
                $( "#Temperature" ).slider( "option", "value",
                                    $( '#kannwas' ).colorClash("option", "temperature"));
            }
        },
        manipulation_cb: function() {
            //console.log("do something after a manipulation was performend");
        }
    });

	$( "#Red" ).slider({
		value:          0,
        min:            -255,
        max:            255,
		orientation:    "horizontal",
		animate:        true,
        stop: function(event, ui) {
            $( '#kannwas' ).colorClash("option", "red", ui.value);
            //console.log("Lightness", $( '#kannwas' ).colorClash("option", "red"));
        }
	});

    $( "#Green" ).slider({
        value:          0,
        min:            -255,
        max:            255,
        orientation:    "horizontal",
        animate:        true,
        stop: function(event, ui) {
            $( '#kannwas' ).colorClash("option", "green", ui.value);
            //console.log("Lightness", $( '#kannwas' ).colorClash("option", "green"));
        }
    });

    $( "#Blue" ).slider({
        value:          0,
        min:            -255,
        max:            255,
        orientation:    "horizontal",
        animate:        true,
        stop: function(event, ui) {
            $( '#kannwas' ).colorClash("option", "blue", ui.value);
            //console.log("Lightness", $( '#kannwas' ).colorClash("option", "blue"));
        }
    });

	$( "#Lightness" ).slider({
		value:          0,
        min:            -150,
        max:            150,
		orientation:    "horizontal",
		animate:        true,
        stop: function(event, ui) {
            $( '#kannwas' ).colorClash("option", "lighten", ui.value);
            //console.log("Lightness", $( '#kannwas' ).colorClash("option", "lighten"));
        }
	});

	$( "#Saturation" ).slider({
		value:          100,
        min:            0,
        max:            100,
		orientation:    "horizontal",
		animate:        true,
        stop: function(event, ui) {
            $( '#kannwas' ).colorClash("option", "saturate", ui.value/100);
            //console.log("Saturation", $( '#kannwas' ).colorClash("option", "saturate"));
        }
	});

	$( "#Temperature" ).slider({
		value:          0,
        min:            -45,
        max:            45,
		orientation:    "horizontal",
		animate:        true,
        stop: function(event, ui) {
            $( '#kannwas' ).colorClash("option", "temperature", ui.value);
            //console.log("Temperature", $( '#kannwas' ).colorClash("option", "temperature"));
        }
	});

	$( "#Color" ).slider({
        value:          0,
        min:            -45,
        max:            45,
        orientation:    "horizontal",
        animate:        true,
        stop: function(event, ui) {
            $( '#kannwas' ).colorClash("option", "coloring", ui.value);
            //console.log("Color", $( '#kannwas' ).colorClash("option", "coloring"));
        }
	});

    var x = true;
    $( "#Vertical" ).click(function () {
        $( '#kannwas' ).colorClash("option", "vertical", x);
        x = !x;
        //console.log("Vertical", $( '#kannwas' ).colorClash("option", "vertical"));
    });

    var y = true;
    $( "#Horizontal" ).click(function () {
            $( '#kannwas' ).colorClash("option", "horizontal", y);
        y = !y;
        //console.log("Horizontal", $( '#kannwas' ).colorClash("option", "horizontal"));
    });

    $( "#Undo" ).click(function () {
            $( '#kannwas' ).colorClash("option", "undo", true);
        //console.log("Undo", $( '#kannwas' ).colorClash("option", "undo"));
    });

    $( "#ChangeImg" ).click(function () {
        if ($( '#kannwas' ).colorClash("option", "img")[0] === "img/Plant.jpg") {
            $( '#kannwas' ).colorClash("option", "img", ["img/Plant2.jpg", 800, 480]);
        }
        else{
            $( '#kannwas' ).colorClash("option", "img", ["img/Plant.jpg", 800, 480]);
        }
        //console.log($( '#kannwas' ).colorClash("option", "img"));
    });


    var element = $( "#kannwas" ),
        newMoveX = 0, newMoveY = 0, distImgToMouseX = 0, distImgToMouseY = 0;

    $( "#Drag" ).click(function () {
        if (this.value === "Enable Drag") {
            element.mousedown(function(e) {

               distImgToMouseX = e.pageX - ( element.offset().left + $( "#kannwas" ).colorClash("option", "moveImg")[0] );
               distImgToMouseY = e.pageY - ( element.offset().top + $( "#kannwas" ).colorClash("option", "moveImg")[1] );
               //console.log(distImgToMouseX, distImgToMouseY);

                element.mousemove(function(e) {
                    newMoveX = e.pageX - ( element.offset().left + distImgToMouseX );
                    newMoveY = e.pageY - ( element.offset().top + distImgToMouseY );
                    //console.log(newMoveX, newMoveY);
                    $( "#kannwas" ).colorClash("option", "moveImg", [newMoveX, newMoveY]);
                    element.mouseup(function(e) {
                        element.unbind('mousemove');
                    });
                });
        

            });
            this.value = "Disable Drag";
            //console.log($( '#kannwas' ).colorClash("option", "moveImg"));
        } else {
            element.unbind('mousedown');
            element.unbind('mousemove');
            element.unbind('mouseup ');
            this.value = "Enable Drag";
        }
    });
});


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
            canvasExt:          null,
            moveImg:            null,

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
            // create the undoarray which gets destroyed later in the "destroy"-method
            this.variables.undoArray = [];
            this.variables.imgArray = [];

            // create an img as a deep copy which gets destroyed later in the "destroy"-method (imgArray.remove())
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
    
                // get the imagedata
                self.variables.originalImageData = self.variables.canvasContext.
                    getImageData(0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.variables.imgWidth, self.variables.imgHeight);
                self.options.imageData = self.variables.canvasContext.
                    getImageData(0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.variables.imgWidth, self.variables.imgHeight);
    
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
                    //console.log("red");
                    break;
                case "green":
                    this.variables.undoArray.push("green", this.options.green);
                    manipulate = true;
                    //console.log("green");
                    break;
                case "blue":
                    this.variables.undoArray.push("blue", this.options.blue);
                    manipulate = true;
                    //console.log("blue");
                    break;
                case "lighten":
                    this.variables.undoArray.push("lighten", this.options.lighten);
                    manipulate = true;
                    //console.log("lighten");
                    break;
                case "saturate":
                    if (value > 1) { value = 1; }
                        else if (value < 0) { value = 0; }
                        this.variables.undoArray.push("saturate", this.options.saturate);
                        manipulate = true;
                        //console.log("saturate");
                    break;
                case "temperature":
                    this.variables.undoArray.push("temperature", this.options.temperature);
                    manipulate = true;
                    //console.log("temperature");
                    break;
                case "coloring":
                    this.variables.undoArray.push("coloring", this.options.coloring);
                    manipulate = true;
                    //console.log("coloring");
                    break;
                case "vertical":
                    this.variables.undoArray.push("vertical", this.options.vertical);
                    // _flipImg() needs the new value which isn't set yet so we set it ourself and then
                    // invoke the _flipImg()-methode, since we updated the value ourself we don't need
                    // the $.Widget.prototype._setOption.apply(this, arguments)-methode to do the same
                    // later on so we just return out of this
                    this.options.vertical = value;
                    this._flipImg();
                    this._manipulateImg();
                    //console.log("vertical");
                    return;
                case "horizontal":
                    this.variables.undoArray.push("horizontal", this.options.horizontal);
                    this.options.horizontal = value;
                    this._flipImg();
                    this._manipulateImg();
                    //console.log("horizontal");
                    return;
                case "undo":
                    this.undo(value);
                    manipulate = true;
                    //console.log("undo");
                    break;
                case "imageData":
                    this._imageData(value);
                    //console.log("imageData");
                    if (value !== undefined) {
                        return;
                    }
                    manipulate = true;
                    break;
                case "img":
                    this.variables.undoArray.push("img", this.options.img);
                    this._img(value);
                    manipulate = true;
                    //console.log("imgSrc");
                    break;
                case "canvasExt":
                    // if the extension is smaller than the width/height of the canvas the
                    // canvasExt-array contains the values [-imgWidth, -imgHeight]
                    if (value[0] < 0 && this.variables.imgWidth - (-1 * value[0]) < 0 ) { value[0] = -1 * this.variables.imgWidth; }
                    this.variables.canvas.width  = this.variables.imgWidth  + value[0];
                    if (value[1] < 0 && this.variables.imgHeight - (-1 * value[1]) < 0 ) { value[1] = -1 * this.variables.imgHeight; }
                    this.variables.canvas.height = this.variables.imgHeight  + value[1];
                    //console.log("canvasExt");
                    break;
                case "moveImg":
                    // move an image by absolute positioning, no negative values possible
                    if (value[0] < 0) { value[0] = 0; }
                    if (value[0] > 0 && value[0] + this.variables.imgWidth > this.variables.canvas.width) {
                        value[0] = this.variables.canvas.width - this.variables.imgWidth; }
                       
                    if (value[1] < 0) { value[1] = 0; }
                    if (value[1] > 0 && value[1] + this.variables.imgHeight > this.variables.canvas.height) {
                        value[1] = this.variables.canvas.height - this.variables.imgHeight; }

                    this.variables.canvasContext.clearRect(0, 0, this.variables.canvas.width, this.variables.canvas.height);
                    this.variables.canvasContext.putImageData(this.options.imageData, 0 + value[0], 0 + value[1]);
                    //console.log("moveImg");
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
            // getter
            if (value === undefined) {
                return this.options.undo;
            } else {
            // setter
                var action = "";
                this.options.undo = value;
                
                if (value) {
                    
                    if (this.variables.undoArray.length > 0) {
                        // get the last action and its value
                        action = this.variables.undoArray[this.variables.undoArray.length - 2];
                        value  = this.variables.undoArray[this.variables.undoArray.length - 1];
                        //console.log(action, value);

                        // set the old value and apply it to the image
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

                        // the old state is now the current one so delete the last two entries
                        this.variables.undoArray.pop();
                        this.variables.undoArray.pop();
                    }
                }
                //console.log(this.variables.undoArray);

                // ui.name indicates the which action was restored
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

            // take all changes into account and form constants out of them, this should be the most
            // performent way to manipulate the image
            // lighten: the higher the pixelvalue the brighter it gets
            // temperature: if the red value ist much greater then the blue one the image turns orange
            //              if the blue value is much greater then the red one the image turns "polarblue"
            //              this can be easily achieved by making the difference between red and blue greater
            // coloring: if you increase the red and blue pixelvalues while decreasing the green one the image
            //           turns violet vice versa it turns green

            constR = this.options.red   + this.options.lighten + this.options.temperature + this.options.coloring;
            constG = this.options.green + this.options.lighten                            - this.options.coloring;
            constB = this.options.blue  + this.options.lighten - this.options.temperature + this.options.coloring;

            // the while-loop automatically terminates at 0, subtracting 4 on countOfPixels every loop is the
            // most performent way because the while loop checks against an shrinking value and can decide
            // faster whether it reached 0 or not
            while (countOfPixels) {
                countOfPixels -= 4;
                
                newR = tempOriginalImageData_data[countOfPixels]     + constR;
                newG = tempOriginalImageData_data[countOfPixels + 1] + constG;
                newB = tempOriginalImageData_data[countOfPixels + 2] + constB;

                // This attempt (different weights for red, green and blue) seems to look "better"
                // then just averaging the sum of r/g/b (because our eye differs in its sensitivity
                // for r/g/b and this attempt takes it into account)
                greyscaleIntensity = 0.3 * newR + 0.59 * newG + 0.11 * newB;

                // saturate indicates the degree of saturation so 1 - saturation is the value for the desaturation
                tempImageData_data[countOfPixels]     = greyscaleIntensity * (1 - tempSaturate) + newR * tempSaturate;
                tempImageData_data[countOfPixels + 1] = greyscaleIntensity * (1 - tempSaturate) + newG * tempSaturate;
                tempImageData_data[countOfPixels + 2] = greyscaleIntensity * (1 - tempSaturate) + newB * tempSaturate;
            }
            this.options.imageData.data = tempImageData_data;
            this.variables.canvasContext.
                putImageData(this.options.imageData, 0 + this.options.moveImg[0], 0 + this.options.moveImg[1]);
            this._trigger("manipulation_cb");
        },

        // flip the image
        _flipImg: function() {
        ////////////////////
            // flipping the image is quiet easy (done via scale(ver, hor)) the difficult part is
            // placing the image in the right position after the flipping happend
            var ver = 1,
                hor = 1,
                width = this.variables.imgWidth,
                height = this.variables.imgHeight;

            // there are four different ways (ver, none) (hor, none) (ver, hor) (none,none)
            // caution! there are four IF-Statements (no if-else) so in case of (ver, hor) the first
            // three if-statements return true btw -1 indicates the flipping
            if (this.options.vertical) { ver = -1; height = 0; }
            if (this.options.horizontal) { hor = -1; width = 0; }
            if (this.options.vertical && this.options.horizontal) { width = this.variables.imgWidth; height = this.variables.imgHeight; }
            if (!this.options.vertical && !this.options.horizontal) { width = 0; height = 0; }

            this.variables.canvasContext.save();
            this.variables.canvasContext.clearRect(0, 0, this.variables.canvas.width, this.variables.canvas.height);
            this.variables.canvasContext.scale(ver, hor);
            this.variables.canvasContext.
                drawImage(this.variables.curImg[0], (ver * width) + (ver * this.options.moveImg[0]),
                    (hor * height) + (hor * this.options.moveImg[1]));
            this.variables.canvasContext.restore();
            this.variables.originalImageData =
                this.variables.canvasContext.getImageData(0 + this.options.moveImg[0], 0 + this.options.moveImg[1], this.variables.imgWidth, this.variables.imgHeight);
        },

        ////////////////////
        _imageData: function (value) {
        ////////////////////
            if(value !== undefined) {
                // do nothing needs to be correctly implemented
                console.log("Needs to be correctly implemented, till now this widget needs images ... sorry, but" +
                   " of course you can get the imageData via $( '#canvas' ).imgManipulation(\"option\", \"imageData\");");
            }
        },

        // apply the new image
        _img: function (value) {
        ////////////////////
            // check if image was loaded before
            var firstTime = true;

            for (var i = this.variables.imgArray.length - 1; i >= 0; i--) {
                //console.log(this.variables.imgArray[i][0], value);
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

            // create an img as a deep copy which gets destroyed later in the "destroy"-method (imgArray.remove())
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
                    drawImage(tempImg[0], 0 + self.options.moveImg[0], 0 + self.options.moveImg[1]);
    
                // get the imagedata
                self.variables.originalImageData = self.variables.canvasContext.
                    getImageData(0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.variables.imgWidth, self.variables.imgHeight);
                self.options.imageData = self.variables.canvasContext.
                    getImageData(0 + self.options.moveImg[0], 0 + self.options.moveImg[1], self.variables.imgWidth, self.variables.imgHeight);
    
                self._flipImg();
                self._manipulateImg();
                self.variables.imgArray.push([value, tempImg]);
            });
        },

        // Use the destroy method to clean up any modifications your widget has made to the DOM
        destroy: function () {
        ////////////////////
            // remove the Elements added by the Widget
            this.variables.curImg.remove();
            this.variables.undoArray.remove();
            this.variables.imgArray.remove();
            this.options.canvasExt.remove();
            this.options.moveImg.remove();
            // unbind Callbacks
            this.element.unbind("create_cb");
            this.element.unbind("undo_cb");
            this.element.unbind("manipulation_cb");

          $.Widget.prototype.destroy.call(this);
        }
    });
}(jQuery));