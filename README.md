colorClash
==========

colorClash is a JavaScript widget which performs some simple imagemanipulation in a performant way.

Setting up the Widget
---------------------
At its minimum it needs the img given as an array with its imgSrc, imgWidth and imgHeight.

	  $( "#canvasName" ).colorClash({
        img:	["img/Plant.jpg", 800, 480]
    });


Using the Widget (with a slider)
--------------------------------
Lets change the degree of saturation (value between 0 and 1)
  
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

Lets get the degree of saturation

	$( '#kannwas' ).colorClash("option", "saturate");


### Values ###

- red
- green
- blue
- lighten
- saturate
- temperature
- coloring
- vertical
- horizontal
- undo
- img
- canvasWidthExt
- canvasHeightExt

### Range of Values ###

##### -255 to 255 #####
red, green, blue, lighten, temperature, coloring

##### 0 to 1 #####
saturate

##### true to false #####
vertical, horizontal, undo

##### -x to y #####
canvasWidthExt, canvasHeightExt 
(if the negative value is greater than the positive value of imgWidth/imgHeight the value
becomes -imgWidth/imgHeight)

##### arrays #####
img takes an array of three values [imgSrc, imgWidth, imgHeight],
canvasExt takes an array of two values [canvasWidthExt, canvasHeigthExt],
moveImg takes an array of two values [moveX, moveY] where moveX, moveY > 0 (absolute position!)


To-do
-----
- my english isn't the best, so if you want to correct me in my comments feel free to 
  	do so.
		
- implement imageData correctly (also change Width and Height, maybe create an Image for
		easier internal useage) - if this is done change the name to imgData and add it to "undo".

- if canvasWidthExt or canvasHeightExt changes apply these changes to the imgWidth or 
		imgHeight if it affects them.


Notice
------
- don't change the canvas-size via css change it through the widget (to contain
		the right proportion)!

- everything that works correctly (and manipulates the image) gets added to the undo-function.


Bugs
----
- when viewing the index.html in Chrome throws some errors (website needs to run on a server).
		Don't know who fine it works on Safari and ChangeImg got problems on the IE


Future-features (I'll do them tomorrow... i'll promise... or maybe you can ?)
-------------------------------------------------------------------------------
- rotate
- crop
- drop from desktop or website to canvas
- save to desktop
- matrix-manipulations (like sharpen, blur n stuff)