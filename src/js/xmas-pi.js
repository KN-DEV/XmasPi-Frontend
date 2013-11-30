(  function ( $ ) {
    var NUM_OF_LIGHT_BULBS = 40;

    /* Frames collection
       ===================================================*/
    var Frames = function() {};
    
    /* Initialises frames.list with empty array filled with
     * 40 'undefined'
     */
    Frames.prototype.list = [new Array(NUM_OF_LIGHT_BULBS)];

    Frames.prototype.push = function(array) {
        console.log("Pushing new array");
        this.list.push(array);
    }

    Frames.prototype.pop = function() {
        this.list.pop();
    }

    Frames.prototype.assignArray = function(array, index) {
        this.list[index] = array; 
    }

    /* assigns value to the array[id] in list[index]
     */
    Frames.prototype.assignValue = function(index, id, value) {
        this.list[index][id] = value; 
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

    Frames.prototype.lengthOf = function() {
        return this.list.length; 
    }

    /* properties
     *
     * variables are 'static' - it works for now, probably should be fixed
     */
    var frames = new Frames();
    var frameCounter = 0;

    var SAVE_BULBS_POSITION = true;

    /* Checks if bulb is in it's on or off state, and changes the class
     * accordingly
     */

    /* Toggles button value using previously saved frames collection,
     * and changes it's class using toggleLightBulb function
     */
    var toggleBulbs = function($this, frames) {
        $this.find('button').each(function(i) {
            // checks if frame at frameCounter exists, if not
            // do nothing
            if ( frames.indexAt(frameCounter) ) {
                // handles 'frames' assignment
                if( frames.indexAt(frameCounter)[i] == undefined ) {
                    this.value = 0;
                } else {
                    this.value = frames.indexAt(frameCounter)[i];
                }

                // handles class change
                if ( $this.value == 0 || $this.value == undefined ) {
                    $($this).find('i').removeClass('fa-square').addClass('fa-square-o');
                } else {
                    $($this).find('i').removeClass('fa-square-o').addClass('fa-square');
                } 
            }
        });
    }

    var clearFrame = function($this) {
        $this.find('button').each(function() {
            this.value = 0;
        });
        $this.find('i').each(function() {
            $(this).removeClass('fa-square').addClass('fa-square-o');
        })}
    
    /* Same as before with pre update check of frame bounds
     */
    $.fn.previousFrame = function() {
        if ( frameCounter-1 < 0 ) {
            console.log("This is the first frame, you can't go back.");
            console.log("Frame: " + frameCounter);
        } else {
            clearFrame(this);
            frameCounter--;
            toggleBulbs(this, frames);
            console.log("Frame: " + frameCounter);
        } 
    }

    $.fn.addFrame = function() {
        frames.push(new Array(NUM_OF_LIGHT_BULBS));
    }

    /* handler method used to assign values to frames
     */
    $.fn.assignValue = function(id, value) {
        frames.assignValue(frameCounter, id, value);
        //console.log(frames.list);
    }
}( jQuery ));
