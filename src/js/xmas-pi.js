(  function ( $ ) {
    /*Collection = function() {}*/

    //Collection.prototype.list = [];

    //Collection.prototype.push = function(string) {
        //this.list.push(string);
    //}

    //Collection.prototype.displayElementAt = function(index) {
        //console.log(Collection.prototype.list[index]); 
    //}

    //$.fn.test = function(string) {
        //col = new Collection();

        //col.push(string);
        //col.displayElementAt(0);
    /*}*/

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

    Frames.prototype._empty = function() {
        this.list = [];
    }

    Frames.prototype.indexAt = function(index) {
        return this.list[index];
    }

    Frames.prototype.last = function() {
        return this.list[this.list.length - 1];
    }

    var frames = new Frames();

    /* adds current frame to Frames collection
     * $this used to reference object calling the function
     */
    var addCurrentFrame = function($this, frames) {
        //console.log($this.id);
        var bulbArray = [];

        $this.find('button').each(function(i) {
            if ( this.value == "" ) {
                bulbArray[i] = 0;
            } else {
                bulbArray[i] = parseInt(this.value);
            }
        });
        frames.push(bulbArray);

        console.log(frames.indexAt(0));
    }

    $.fn.addFrame = function() {
        var frames = new Frames();
        addCurrentFrame(this, frames);
    }
}( jQuery ));
