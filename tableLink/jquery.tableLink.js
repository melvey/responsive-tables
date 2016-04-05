(function($) {

	function parseMinSize(minSize) {
		var minVal = 0;
		var type = null;

		var matches = /(\d*)px/.exec(minSize);
		if(matches) {
			return {val: matches[1], type: 'px'};
		}
		matches = /(\d*)%/.exec(minSize);
		if(matches) {
			return {val: matches[1], type: '%'};
		}
		return null;
	}
	

	$.fn.tableLink = function(options) {
		options = options || {};
		var thisTable = this;
		var minVal = parseMinSize(options.hide);
		if(!minVal) {
			throw new Error('Invalid hide size');
		}
		var origFontSize = parseInt(this.css('font-size'), 10);
		var origTextScale = origFontSize / this.innerWidth();
		console.log('Font: ' + origFontSize + 'px, Scale: ' + origTextScale + ', Back: ' + (this.innerWidth() * origTextScale));
		$(window).on('resize', function() {
			var newFontSize = thisTable.innerWidth() * origTextScale;
			newFontSize = newFontSize < origFontSize ? newFontSize  : origFontSize;
			thisTable.css('font-size', newFontSize + 'px');
			console.log(newFontSize);

			let hide = false;
			if(minVal.type === '%') {
				console.log((newFontSize / origFontSize) + ',' + (minVal.val/100));
				if((newFontSize / origFontSize) < (minVal.val / 100)) {
					hide = true;
				}
			} else if(minVal.type === 'px') {
				if($(window).innerWidth() < minVal.val) {
					hide = true;
				}
			}

			if(hide) {
				thisTable.addClass('tablelink-hide');
			} else {
				thisTable.removeClass('tablelink-hide');
			}

			if(thisTable.outerWidth() > thisTable.parent().innerWidth()) {
				console.log('Oops');
			}
		});
		
		return this;
	};
}(jQuery));
