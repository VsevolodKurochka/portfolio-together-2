(function(){

	// General functions
	function log(logText){
		console.log(logText);
	}
	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	function addClass(element,cls){
		if( !hasClass(element, cls) )
			element.className += ' ' + cls;
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


	document.addEventListener("DOMContentLoaded", function(){

		var d = document;
		var classes = {
			active: 'active',
			menuActive: 'vnav__menu_active'
		}


		var jsNav = d.getElementById('navigation');
		//var jsNavBtn = d.getElementById('js-vnav__btn');
		var jsNavLinks = d.querySelectorAll('.vnav__menu a[href*="#"]');
		//var jsNavText = d.getElementById('js-nav-text');

		var anchors = d.getElementsByClassName('anchor');
		

		// Functions

			function ifExist(element){
				return typeof(element) != 'undefined' && element != null;
			}

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

			function clickChangeClasses(el_1, el_1_class, el_2, el_2_class){
				el_1.addEventListener('click', function(){
					toggleClass(this, el_1_class);
					toggleClass(el_2, el_2_class);
				});
			}


		// Connect particles
		// particlesJS.load('particles-js', 'js/lib/particles.json', function() {
		// 	console.log('callback - particles.js config loaded');
		// });

		
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

		 //log(checkVisible(document.getElementById('particles-js')));
  

		
		// Button menu
			//clickChangeClasses(jsNavBtn, classes.active, jsNav, classes.menuActive);


		// for(var i = 0; i < anchors.length; i++){
		// 	anchors[i].addEventListener('click', function(e){
		// 		e.preventDefault();
		// 		var href = this.getAttribute("href").replace("#", "");
		// 		var scrollAnchor = document.getElementById(href);
		// 		scrollTo(document.body, scrollAnchor.offsetTop, 600);
		// 	});
		// }
		

		// for(var i = 0; i < jsNavLinks.length; i++){
		// 	jsNavLinks[i].addEventListener('click', function(e){
		// 		e.preventDefault();

		// 		var vnavhref = this.getAttribute("href").replace("#", "");
		// 		var vnavscrollAnchor = document.getElementById(vnavhref);

		// 		removeClass(jsNavBtn, classes.active);
		// 		removeClass(jsNav, classes.menuActive);

		// 		scrollTo(document.body, vnavscrollAnchor.offsetTop, 600);

		// 	});
		// }

		

		// Preloader
			// var images 								= d.images,
			// 		images_total_count 		= images.length,
			// 		images_loaded_count 	= 0,
			// 		loader_percent 				= d.getElementById('loader_percent'),
			// 		loader_bar 						= d.getElementById('loader_bar'),
			// 		loader_animation 			= d.getElementById('loader_animation'),
			// 		image_clone,
			// 		images_formula;


			// for(var i = 0; i < images_total_count; i++){
			// 	image_clone = new Image();
			// 	image_clone.onload = loader;
			// 	image_clone.onerror = loader;
			// 	image_clone.src = images[i].src;
			// }


			// function loader(){
			// 	images_loaded_count++;
			// 	images_formula = parseInt((100 / images_total_count) * images_loaded_count);
			// 	loader_percent.innerHTML = images_formula + '%';
			// 	//loader_bar.style.width = images_formula + '%';
			// 	if( (typeof(loader_animation) != 'undefined' && loader_animation != null ) && (images_loaded_count >= images_total_count / 2)){
			// 		loader_animation.style.animationDuration = "0.5s";
			// 	}
			// 	if(images_loaded_count >= images_total_count){
			// 		setTimeout(function(){
			// 			addClass(d.body, 'loaded');
			// 		}, 1200);
			// 	}
			// }
		// Collapse
			// function show(el){
			// 	el.style.display = 'block';
			// }
			// function getHeight(el){
			// 	var el_style      = window.getComputedStyle(el),
			// 			el_display    = el_style.display,
			// 			el_position   = el_style.position,
			// 			el_visibility = el_style.visibility,
			// 			el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),

			// 			wanted_height = 0;

			// 	// if its not hidden we just return normal height
			// 	if(el_display !== 'none' && el_max_height !== '0') {
			// 			return el.offsetHeight;
			// 	}

			// 	// the element is hidden so:
			// 	// making the el block so we can meassure its height but still be hidden
			// 	el.style.position   = 'absolute';
			// 	el.style.visibility = 'hidden';
			// 	el.style.display    = 'block';

			// 	wanted_height     = el.offsetHeight;

			// 	// reverting to the original values
			// 	el.style.display    = el_display;
			// 	el.style.position   = el_position;
			// 	el.style.visibility = el_visibility;

			// 	return wanted_height;            
			// }
			// function setStylesForSlide(el, dataMax){
			// 	var el_max_height       = 0;
			// 	el.style['transition']  = 'max-height 0.5s ease-in-out';
			// 	el.style.overflowY      = 'hidden';
			// 	el.style.maxHeight      = '0';
			// 	if(dataMax == 'data-max-true'){
			// 		el_max_height     = getHeight(el) + 'px';
			// 		el.setAttribute('data-max-height', el_max_height);
			// 	}
			// 	el.style.display        = 'block';

			// 	// we use setTimeout to modify maxHeight later than display (to we have the transition effect)
			// 	setTimeout(function() {
			// 		el.style.maxHeight = el_max_height;
			// 	}, 10);
			// }
		// 	function toggleSlide(el){
		// 		if(el.getAttribute('data-max-height')) {
		// 			// we've already used this before, so everything is setup
		// 			if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
		// 				el.style.maxHeight = el.getAttribute('data-max-height');
		// 			}else {
		// 				el.style.maxHeight = '0';
		// 			}
		// 		}else{
		// 			var el_max_height     = getHeight(el) + 'px';
		// 			el.style['transition']  = 'all ease-in-out 0.5s';
		// 			el.style.overflowY      = 'hidden';
		// 			el.style.maxHeight      = '0';
					
		// 			el.setAttribute('data-max-height', el_max_height);
		// 			el.style.display        = 'block';

		// 			if(el.offsetHeight === '0'){
		// 				setTimeout(function() {
		// 					el.style.maxHeight = 'el_max_height';
		// 				}, 10);						
		// 			}else{
		// 				setTimeout(function() {
		// 					el.style.maxHeight = 0;
		// 				}, 10);	
		// 			}
					

		// 			// we use setTimeout to modify maxHeight later than display (to we have the transition effect)

		// 		}
		// 	}	
		// 	function toggleSlide1(el) {
	//       var el_max_height = 0;

	//       if(el.getAttribute('data-max-height')) {
	//         if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
	//           el.style.maxHeight = el.getAttribute('data-max-height');
	//         }else {
	//           el.style.maxHeight = '0';
	//         }
	//       }else {
	//           el_max_height                  = getHeight(el) + 'px';
	//           el.style['transition']         = 'max-height 0.5s ease-in-out';
	//           el.style.overflowY             = 'hidden';
	//           el.style.maxHeight             = '0';
	//           el.setAttribute('data-max-height', el_max_height);
	//           el.style.display               = 'block';

					 
	//           setTimeout(function() {
	//               el.style.maxHeight = el_max_height;
	//           }, 10);
	//       }
	//   }
		// var vcollapse = document.getElementsByClassName('vcollapse');

		// for(var i = 0; i < vcollapse.length; i++){

		// 	vcollapse[i].addEventListener('click', function(e){
		// 		var target = e.target;
		// 		if(target.closest('.vcollapse-header')){

		// 			toggleSlide1(this.getElementsByClassName('vcollapse-body')[0]);
		// 			toggleClass(this, 'active');
		// 		}else{
		// 			return;
		// 		}
		// 	});
		// }

			// d.getElementById('toggle').addEventListener('click', function(){
			// 	toggleSlide(d.getElementById('toggleBlock'));
			// });
	});
}());