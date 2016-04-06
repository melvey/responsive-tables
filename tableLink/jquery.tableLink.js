(function($) {
	'use strict';

	var hideClass = 'tablelink-hide';
	var modalBgClass = 'tablelink-bg';

	/**
	 * Show the full size table in a modal dialog
	 * @param {DOMElement} table The table to show
	 * @param {int} fontSize the font size in pixes to default to
	 * @return {DOMElement} The modal
	 */
	function showModal(table, fontSize) {
		var modalBg = $('<div></div>').addClass(modalBgClass);
		var newTable = $(table).clone().removeClass(hideClass).css('font-size', fontSize).width('');
		modalBg.append(newTable);
		$('body').append(modalBg);
		modalBg.on('click', function() {
			$('body').remove(modalBg);
		});
		return modalBg;
	}

	function rescaleTable(table, options) {
		var parentWidth = table.parent().innerWidth();
		var newWidth = options.origWidth > parentWidth ? parentWidth : options.origWidth;
		var newFontSize = newWidth * options.textScale;
		if(options.origTextSize && options.origTextSize < newFontSize) {
			newFontSize = options.origTextSize;
		}
		table.css('font-size', newFontSize + 'px');
		table.css('width', newWidth + 'px');

		var hide = newWidth <= options.hideWidth;
		var isHidden = table.hasClass(hideClass);

		if(hide && !isHidden) {
			table.addClass(hideClass);
			table.on('click', function() {
				showModal(table, options.origTextSize || options.origWidth * options.textScale);
			});
		} else if(!hide && isHidden) {
			table.removeClass(hideClass);
		}
	}
	

	$.fn.tableLink = function(options) {
		options = options || {};
		var thisTable = this;
		var minVal = 0;
		var matches = /(\d*)px/.exec(options.hide);
		if(matches) {
			minVal = matches[1];
		}
		if(!minVal) {
			throw new Error('Invalid hide size');
		}
		var origWidth = this.innerWidth();
		var origFontSize = parseInt(this.css('font-size'), 10);
		var origTextScale = origFontSize / origWidth;
		console.log('Font: ' + origFontSize + 'px, Scale: ' + origTextScale + ', Back: ' + (this.innerWidth() * origTextScale));
		$(window).on('resize', function() {
			rescaleTable(thisTable, {origWidth: origWidth, textScale: origTextScale, hideWidth: minVal});
		});
		
		return this;
	};
}(jQuery));
