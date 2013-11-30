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

    Frames.prototype.fill = function(array, index) {
        for ( var i = 0; i < array.length; i++ ) {
            this.list[index][i] = array[i];
        } 
    }

    Frames.prototype.delete = function(index) {
        if ( index > -1 ) {
            this.list.splice(index, 1); 
        }
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

    /* assigns value to the frames.list of given id
     */
    $.fn.assignValue = function(id, value) {
        frames.assignValue(frameCounter, id, value);
    }

    var toggleLightBulb = function($this) {
        if ( $this.value == 0 || $this.value == undefined ) {
            $($this).find('i').removeClass('fa-square').addClass('fa-square-o');
        } else {
            $($this).find('i').removeClass('fa-square-o').addClass('fa-square');
        } 
    }

    /* Toggles button value using previously saved frames collection,
     * and changes it's class using toggleLightBulb function
     */
    var toggleBulbs = function($this, frames) {
        $this.find('button').each(function(i) {
            //console.log(frameCounter);
            //console.log(frames.indexAt(frameCounter)[i]); 
            
            // checks if frame at frameCounter exists, if not
            // do nothing
            if ( frames.indexAt(frameCounter) ) {
                if( frames.indexAt(frameCounter)[i] == undefined ) {
                    this.value = 0;
                } else {
                    this.value = frames.indexAt(frameCounter)[i];
                }
                toggleLightBulb(this);
            }
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

    $.fn.getFrames = function() {
        return frames; 
    }

    $.fn.getFramesCount = function() {
        return frameCounter+1; 
    }
         
    /* Next frame method updates current frame accordingly
     * (whether the frames collection is emtpy or not, it's gonna
     * push a new array, or assign current one).
     * It clears the current bulb buttons, and increments frameCounter
     * Then it toggles bulbs according to their button value
     */
    $.fn.nextFrame = function() {
        console.log(frames.lengthOf());
        if ( frameCounter >= frames.lengthOf()-1 ) {
            console.log("This is the last frame, you can't move forward");
            console.log("Frame: " + frameCounter); 
        } else {
            if ( !SAVE_BULBS_POSITION ) {
                clearFrame(this);
            }
            console.log(frames);
            console.log(frames.list);
            frameCounter++;
            toggleBulbs(this, frames);
            console.log("Frame: " + frameCounter);
        }
    }
    
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

    $.fn.moveToFrame = function(frame) {
        clearFrame(this);
        frames.fill(frames.indexAt(frame), frame);
        frameCounter = frame;
        toggleBulbs(this, frames);
    }

    /* appends empty array to frames collection, and fills it with content from
     * previous frame
     */
    $.fn.addFrame = function() {
        frames.push(new Array(NUM_OF_LIGHT_BULBS));
        frames.fill(frames.indexAt(frames.lengthOf()-2),
                frames.lengthOf()-1);
        this.moveToFrame(frames.lengthOf()-1);
    }

    $.fn.deleteFrame = function(index) {
        if ( frames.lengthOf() > 0 ) {
            if ( index == frames.lengthOf()-1 ) {
                frames.delete(index);
                frameCounter--;
                clearFrame(this);
                toggleBulbs(this, frames);
            } else {
                frames.delete(index);
                clearFrame(this); 
                toggleBulbs(this, frames);
            }
        } else {
            console.log("No more frames, preventing deletion");
        }
    }
}( jQuery ));
