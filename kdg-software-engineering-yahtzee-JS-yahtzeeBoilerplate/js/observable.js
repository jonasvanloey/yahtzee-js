function Observable() {
	
	// Create reference to this by renaming this, so you can still use this inside functions
	var _self = this;

	// members that will collect necessary data
	_self.data;
    _self.subscribers = []

    // Public methods
	_self.methods = {

		// Triggered when data is set (using publish method)
	    subscribe: function(callback) {
	        // In most situations, you would check to see if the
	        // callback already exists within the subscribers array,
	        // but for the sake of keeping us on track and because
	        // this isn't necessarily included, we'll leave it out.
	        // Just add the callback to the subscribers list
	        _self.subscribers.push(callback);
	    },

	    unsubscribe: function(callback) {
	        var i = 0,
	            len = _self.subscribers.length;
	        // Iterate through the array and if the callback is
	        // found, remove it.
	        for (; i < len; i++) {
	            if (_self.subscribers[i] === callback) {
	                _self.subscribers.splice(i, 1);
	                // Once we've found it, we don't need to
	                // continue, so just return.
	                return;
	            }
	        }
	    },

	    // Used to set and retrieve current value
	    publish: function( data ) {

	    	if (typeof data !== 'undefined') {

		    	_self.data = data;
		        // Iterate over the subscribers array and call each of
		        // the callback functions.
		        for (var subscriberKey = 0; subscriberKey < _self.subscribers.length; ++subscriberKey) {
		            _self.subscribers[ subscriberKey ](data);
		        }
	    	} else {
	    		return _self.data
	    	}
	    }
	}

	return _self.methods
};

// Create a new observable
var dice = new Observable();

// Add function will be executed when new dice value is published
dice.subscribe( function() {
	// Get current dice value
	var diceValue = dice.publish();

	// Add dice value as text to score-value element in HTML
	$('.score-value').html( diceValue );
})

// Add event listener on button
$( 'button' ).on('click', function() {

	// Calculate random number between 1-6
	var randomNumber = Math.floor( Math.random() * 6  ) + 1

	// Publish new random number
	dice.publish( randomNumber );

	// Add dice value as text to dice-value element in HTML
	$('.dice-value').html( randomNumber );
})
$('.dice').find( 'button' ).on( 'click', function(element){
    console.log($(this).val());
    
})