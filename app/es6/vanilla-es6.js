// General functions
	function log(logText){
		console.log(logText);
	}
	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	function addClass(element,cls){
		if( !hasClass(element, cls) ){
			let empty = '';
			if(element.classList.value != "")
				empty = ' ';
			element.className += empty + cls;
		}
	}

	function removeClass(element, cls){
		if(hasClass(element, cls)){
			element.classList.remove(cls);
		}
	}

	function toggleClass(element, cls){
		if( hasClass(element, cls) ){
			removeClass(element, cls)
		}else{
			addClass(element, cls);
		}
	}

	function exists(element){
		return typeof(element) != 'undefined' && element != null;
	}

(function(){
	document.addEventListener("DOMContentLoaded", function(){

		const d = document;
		const classes = {
			active: 'active',
			menuActive: 'vnav__menu_active'
		}

		// Button menu
			const jsNavBtn = d.getElementById('js-vnav__btn');
			if(exists(jsNavBtn)){
				jsNavBtn.addEventListener('click', function(){
					toggleClass(this, classes.active);
					toggleClass(jsNav, classes.menuActive);
				});
			}


		// Click on toggle element in navigation
			const jsNavText = d.getElementById('js-nav-text');
			if(exists(jsNavText)){
				jsNavText.addEventListener('click', function() {
					toggleClass(this, classes.active);
				});	
			}

		// Anchors links
			function scrollTo(element, to, duration) {
				if (duration <= 0) return;
				var difference = to - element.scrollTop - 75;
				var perTick = difference / duration * 10;
				setTimeout(function() {
					element.scrollTop = element.scrollTop + perTick;
					if (element.scrollTop === to) return;
					scrollTo(element, to, duration - 10);
				}, 10);
			}
			
			// Anchors
			const anchors = d.getElementsByClassName('anchor');

			for(let i = 0; i < anchors.length; i++){
				anchors[i].addEventListener('click', (e) => {
					e.preventDefault();
					let href = this.getAttribute("href").replace("#", "");
					let scrollAnchor = document.getElementById(href);
					scrollTo(document.body, scrollAnchor.offsetTop, 600);
				});
			}
			
			// Navigation links
			const jsNavLinks = d.querySelectorAll('.vnav__menu a[href*="#"]');
			const jsNav = d.getElementById('navigation');

			for(var i = 0; i < jsNavLinks.length; i++){
				jsNavLinks[i].addEventListener('click', (e) => {
					e.preventDefault();

					let vnavhref = this.getAttribute("href").replace("#", "");
					let vnavscrollAnchor = document.getElementById(vnavhref);

					removeClass(jsNavBtn, classes.active);
					removeClass(jsNav, classes.menuActive);

					scrollTo(document.body, vnavscrollAnchor.offsetTop, 600);

				});
			}

		// Modal Window initialization
		let modalBtn = d.querySelectorAll('[data-action="vmodal"]');
		let modalBtnL = modalBtn.length;

		const modal = d.querySelectorAll('.vmodal');
		const modalL = modal.length;

		const modalBtnClose = d.querySelectorAll('[data-close="vmodal"]');
		const modalBtnCloseL = modalBtnClose.length;

		
		function modalClose(el){
			removeClass(el, 'vmodal_showing_in');
			removeClass(document.body, 'vmodal-open');
			// if(el.getElementsByClassName('vmodal__video')[0]){
			// 	el.getElementsByClassName('vmodal__video')[0].innerHTML = '';
			// }
		}
		function getEventTarget(e){
			var targ;
	
			if (e.target) { // W3C
				targ = e.target;
			}else if (e.srcElement) { // IE6-8
				targ = e.srcElement;
			}else if(e.originalTarget){
				targ = e.originalTarget;
			}
			if (targ.nodeType == 3) { // Safari
				targ = targ.parentNode;
			}
			return targ;
		}
		function bodyClick(e){
			let target = getEventTarget(e);
			for(let i = 0; i < modalL; i++){
				if (target == modal[i]) {
					modalClose(modal[i]);
				}
			}
		}
		for(var i = 0; i < modalBtnL; i++){
			modalBtn[i].addEventListener('click', function(){
				log(i);
				// Get button data-attributes
				var modalData = this.dataset;

				// Get attribute data-open and replace # with empty line
				var modalID = modalData.open.replace("#", "");
				
				
				if( exists(document.getElementById(modalID) ) ){

					let modalCurrent = document.getElementById(modalID);

					addClass(document.body, 'vmodal-open');
					addClass(modalCurrent, 'vmodal_showing_in');

				}else{
					console.error('No element with ID: ' + modalID);
				}

			});
		}
		
		for(let i = 0; i < modalBtnCloseL; i++){
			modalBtnClose[i].addEventListener('click', function(){
				modalClose(this.closest('.vmodal'));
			});
		}
		
		let bodyEvents = ['click', 'touchstart'];
		let bodyEventsL = bodyEvents.length;

		for(let i = 0; i < bodyEventsL; i++){
			document.body.addEventListener(bodyEvents[i], function(e) {
				bodyClick(e);
			}, false);
		}

		// TYPER
		var movieType = document.getElementById('movie-type');
		if(typeof(movieType) != 'undefined' && movieType != null){
			typer('#movie-type')
				.line('Hello!', {speed: 50})
				.pause(1500)
				.back('all')
				.continue('What is your mood today?')
				.end(function(){
					removeClass(document.getElementById('movie-variety'), 'variety_hidden')
				});
		}
		
		// Switch theme

		var body = document.getElementsByTagName('BODY')[0];
		var movie = document.getElementById('movie');
		var varietyItems = document.getElementsByClassName('js-variety');
		var varietyItemsL = varietyItems.length;

		function checkPalette(functionPalette, callback){
			addClass(body, functionPalette);
	  	if(functionPalette == 'theme-dark'){
	  		removeClass(body, 'theme-light');
			}else if(functionPalette == 'theme-light'){
				removeClass(body, 'theme-dark');
			}
			if(callback && typeof(callback) === 'function'){
				callback();
			}
	  }

	  for(var i = 0; i < varietyItemsL; i++){
	  	varietyItems[i].addEventListener('click', function(){
	  		var palette = this.dataset.palette;
	  		checkPalette(palette, function(){
	  			addClass(movie, 'movie_hidden');
	  		});
	  	});
	  }

	  // Title split each letter

	  var splitTitles = document.getElementsByClassName('js-split');
	  var splitTitlesL = splitTitles.length;

	  for(var i = 0; i < splitTitlesL; i++){

	  	// Get current title
	  	var singleSplit = splitTitles[i];

	  	// Cut title's text into array
	  	var chars = singleSplit.innerHTML.split('');

	  	// Get length of array 
	  	var charsL = chars.length;

	  	// Clear title's text
	  	singleSplit.innerHTML = '';

	  	for(var j = 0; j < charsL; j++){
	  		// Write how should look each letter
	  		var charsSpan = '<span><span>' + chars[j] + '</span></span>';

	  		// Add to title this letter
	  		singleSplit.innerHTML += charsSpan;
	  	}
	  }


	  // Split text by words

	  	var splitText = document.getElementsByClassName('js-split-word');
	  	var splitTextL = splitText.length;

	  	for(var i = 0; i < splitTextL; i++){
	  		var currentEl = splitText[i];
	  		var currentElText = currentEl.innerHTML.split(' ');
	  		var currentElTextL = currentElText.length;
	  		currentEl.innerHTML = '';
	  		for(var j = 0; j < currentElTextL; j++){
	  			var word = '<span>' + currentElText[j] + '</span>';
	  			currentEl.innerHTML += word;
	  		}
	  	}


	  // Visibility

		function checkVisible(elm) {
		  var rect = elm.getBoundingClientRect();
		  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
		}
		
	});
}());