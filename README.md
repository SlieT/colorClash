colorClash
==========

<<<<<<< HEAD
**colorClash** is a JavaScript Widget which performs some simple imagemanipulation in a performant way.
=======
**colorClash** is a JavaScript widget which performs some simple imagemanipulation in a performant way.
>>>>>>> origin/master

Setting up the Widget
---------------------
At its minimum it needs the **img** given as an array with its imgSrc, imgWidth and imgHeight.

	  $( "#canvasName" ).colorClash({
        img:	["img/Plant.jpg", 800, 480]
    });


Using the Widget (with a slider)
--------------------------------
Lets change the degree of **saturation** (value between 0 and 1)
  
	$( "#sliderName" ).slider({
		value:          100,
        min:            0,
        max:            100,
		orientation:    "horizontal",
		animate:        true,
        stop: function(event, ui) {
            $( '#kannwas' ).colorClash("option", "saturate", ui.value/100);
        }
	});

Lets get the degree of **saturation**

	$( '#kannwas' ).colorClash("option", "saturate");


Options
-------
### Values ###

- **red**
- **green**
- **blue**
- **lighten**
- **saturate**
- **temperature**
- **coloring**
- **vertical**
- **horizontal**
<<<<<<< HEAD
- **inverse**
- **undo**
- **reset**
- **img**
- **canvasExt**
- **moveImg**
- **resizeImg**
=======
- **undo**
- **img**
- **canvasExt**
- **moveImg**
>>>>>>> origin/master

### Range of Values ###

##### -255 to 255 #####
- **red**, **green**, **blue**, **lighten**, **temperature**, **coloring**

##### 0 to 1 #####
- **saturate**

##### true to false #####
<<<<<<< HEAD
- **vertical**, **horizontal**, **inverse**, **undo**, **reset**

##### arrays #####
- **img** takes an array of three values [imgSrc, imgWidth, imgHeight]
- **canvasExt** takes an array of two values [canvasWidthExt, canvasHeigthExt] these values can be positiv 
		or negativ \(if the extension is smaller than, for eg. the width of the canvas the
        canvasExt-array contains the values [-imgWidth, imgHeight]\)
- **moveImg** takes an array of two values [moveX, moveY] where moveX and moveY are greater then 0 (
		absolute position! - not relative to the current values).
- **resizeImg** takes an array of two values [newWidth, newHeight] where newWidth and newHeight are greater 
		than 0 (absolute width/height! - not relative to the current values).

### Callbacks ###
- create_cb
- undo_cb
- reset_cb
- manipulation_cb
=======
- **vertical**, **horizontal**, **undo**

##### arrays #####
- **img** takes an array of three values [imgSrc, imgWidth, imgHeight],
- **canvasExt** takes an array of two values [canvasWidthExt, canvasHeigthExt] \(if the negative value is greater
than the positive value of imgWidth/imgHeight the value  becomes -imgWidth/-imgHeight\)
- **moveImg** takes an array of two values [moveX, moveY] where moveX, moveY > 0 (absolute position!)
>>>>>>> origin/master


To-do
-----
- my english isn't the best, so if you want to correct me in my comments feel free to 
  	do so.
		
- implement imageData correctly (also change Width and Height, maybe create an Image for
		easier internal useage) - if this is done change the name to imgData and add it to "undo".


Notice
------
- don't change the canvas-size via css change it through the widget (to contain
		the right proportion)! Use $( '#canvas' ).colorClash("option", "canvasExt", [extWidth, extHeight]);

- everything that works correctly (and manipulates the image!) gets added to the undo-function.
		Till now you can undo **red**, **green**, **blue**, **lighten**, **saturate**, **temperature**, 
		**coloring**, **vertical**, **horizontal**, **inverse**, **img**, **resizeImg**


Bugs
----
- viewing the index.html in Chrome throws some errors (website needs to run on a server).


Future-features (I'll do them tomorrow... i'll promise... or maybe you can ?)
-------------------------------------------------------------------------------
- rotate
- crop
- drop from desktop or website to canvas
- should drag become a part of the widget (maybe "dragPC"?) or is moveImg enough ?
- save to desktop
- matrix-manipulations (like sharpen, blur n stuff)
