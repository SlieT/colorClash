colorClash
==========

colorClash is a JavaScript Widget which performs some simple Imagemanipulation in a performant way.

Setting up the Widget
---------------------
At its minimum it needs the imgSrc, imgWidth and imgHeight

	  $( "#canvasName" ).colorClash({
        imgSrc:     "img/Plant.jpg",
        imgWidth:   800,
        imgHeight:  480
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
- imgWidth
- imgHeight
- canvasWidthExt
- canvasHeightExt

### Range of Values ###

##### -255 to 255 #####
red, green, blue, lighten, temperature, coloring

##### 0 to 1 #####
saturate

##### true to false #####
vertical, horizontal, undo

##### greater 0 #####
imgWidth, imgHeight

##### -x to y #####
canvasWidthExt, canvasHeightExt 
(if the negative value is greater than the positive value of imgWidth/imgHeight the value
becomes -imgWidth/imgHeight)


To-do
-----
- my english isn't the best so if you want to correct me in my comments feel free to 
  	do so.
		
- implement imageData correctly (also change Width and Height, maybe create an Image for
		easier internal useage) - if this is done change the name to imgData and add it to "undo".

- if imgWidth or imgHeight changes, apply these changes correctly to the 
		_imgManipulation-methode (2 for loops instead of "countOfPixels" so that only 
		the width * height rectangle gets manipulated).

- if canvasWidthExt or canvasHeightExt changes apply these changes to the imgWidth or 
		imgHeight if it affects them.


Notice
------
- don't change the canvas-size via css change it through the widget (to contain
		the right proportion)!

- everything that works correctly gets added to the undo-function.


Bugs
----
- "often" when you load the page the first time the image isn't visible on the canvas 
		and (on first time loading) if you click the "ChangeImg"-button the other Image 
		isn't visible nether (it seems like after some refreshes the images are cached 
		and therefore it works).

- when viewing the index.html in Chrome throws some errors (don't even know what its 
    doing in Safari).


Future-features (I'll do them tomorrow... i'll promise... or maybe you can ?)
-------------------------------------------------------------------------------
- drag
- rotate
- crop
- drop from desktop or website to canvas
- save to desktop
- matrix-manipulations (like sharpen, blur n stuff)