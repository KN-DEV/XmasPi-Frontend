(  function ( $ ) {
    /* Frames collection
       ===================================================*/
    var Frames = function() {};

    Frames.prototype.list = [];

    Frames.prototype.push = function(array) {
        this.list.push(array);
    }

    Frames.prototype.pop = function() {
        this.list.pop();
    }

    Frames.prototype.assignArray = function(array, index) {
        this.list[index] = array; 
    }

    Frames.prototype._empty = function() {
        this.list = [];
    }

    Frames.prototype.indexAt = function(index) {
        return this.list[index];
    }

    Frames.prototype.last = function() {
        return this.list[this.list.length - 1];
    }

    /* properties
     *
     * variables are 'static' - it works for now, probably should be fixed
     */
    var frames = new Frames();
    var frameCounter = 0;

    var SAVE_BULBS_POSITION = true;

    /* adds current frame to Frames collection
     * $this used to reference object calling the function
     */
    var updateCurrentFrame = function($this, frames) {
        var bulbArray = [];

        $this.find('button').each(function(i) {
            if ( this.value == "" ) {
                bulbArray[i] = 0;
            } else {
                bulbArray[i] = parseInt(this.value);
            }
        });
        if ( frames.indexAt(frameCounter) == undefined ) {
            frames.push(bulbArray);
        } else {
            frames.assignArray(bulbArray, frameCounter);
        }
    }

    /* Checks if bulb is in it's on or off state, and changes the class
     * accordingly
     */
    var toggleLightBulb = function($this) {
        if ( $this.value == 0 ) {
            $($this).find('i').removeClass('fa-square').addClass('fa-square-o');
        } else {
            $($this).find('i').removeClass('fa-square-o').addClass('fa-square');
        } 
    }

    /* Toggles button value using previously saved frames collection,
     * and changes it's class using toggleLightBulb function
     */
    var toggleBulbs = function($this, frames) {
        console.log("Toggling bulbs");
        $this.find('button').each(function(i) {
            //console.log(frameCounter);
            //console.log(frames.indexAt(frameCounter)[i]); 
            this.value = frames.indexAt(frameCounter)[i];
            toggleLightBulb(this);
        });
    }

    var clearFrame = function($this) {
        $this.find('button').each(function() {
            this.value = 0;
        });
        $this.find('i').each(function() {
            $(this).removeClass('fa-square').addClass('fa-square-o');
        });
    }
         
    /* Next frame method updates current frame accordingly
     * (whether the frames collection is emtpy or not, it's gonna
     * push a new array, or assign current one).
     * It clears the current bulb buttons, and increments frameCounter
     * Then it toggles bulbs according to their button value
     */
    $.fn.nextFrame = function() {
        console.log(frames);
        console.log(frames.list);
        updateCurrentFrame(this, frames);
        if ( !SAVE_BULBS_POSITION ) {
            clearFrame(this);
        }
        frameCounter++;
        toggleBulbs(this, frames);
        console.log("Frame: " + frameCounter);
    }
    
    /* Same as before with pre update check of frame bounds
     */
    $.fn.previousFrame = function() {
        if ( frameCounter-1 < 0 ) {
            frameCounter = 0; 
            console.log("This is the first frame, you can't go back.");
            console.log("Frame: " + frameCounter);
        } else {
            updateCurrentFrame(this, frames); 
            clearFrame(this);
            frameCounter--;
            toggleBulbs(this, frames);
            console.log("Frame: " + frameCounter);
        } 
    }
}( jQuery ));
