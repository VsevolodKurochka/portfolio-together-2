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
	// Modal conctructor
	this.Modal = function(){

		// Create global element references
		this.closeButton = null;
		this.modal = null;
		this.overlay = null;
		this.name = "vmodal";

		this.classes = {
			showing: this.name + '_showing_in',
			overlay: this.name + '__overlay'
		}
		var defaults = {
			id: null,
			className: this.name + "_default " + this.name + "_center",
			closeButton: true,
			title: null,
			titleClass: this.name + "__title",
			titleTag: "p",
			content: null,
			overlay: true
		}
		
		this.options = extendDefaults(defaults, arguments[0]);
		//this.appendToDocument();
	}	


	// Public methods

	// Modal.prototype.appendToDocument = function(){
		
	// }

	Modal.prototype.open = function(){
		buildOut.call(this);
		initialize.call(this);
		addClass(this.modal, this.classes.showing);
		addClass(this.overlay, this.classes.showing);
		addClass(document.body, 'vmodal-open');
	}	

	Modal.prototype.close = function(){
		removeClass(this.overlay, this.classes.showing);
		removeClass(this.modal, this.classes.showing);
		removeClass(document.body, 'vmodal-open');
		this.modal.parentNode.removeChild(this.modal);
		this.overlay.parentNode.removeChild(this.overlay);
	}


	// Private functions

	function extendDefaults(oldObject, newObject){
		var property;
		for(property in newObject){
			if(newObject.hasOwnProperty(property)){
				oldObject[property] = newObject[property];
			}
		}
		return oldObject;
	}


	function buildOut(){
		var d = document, dFragment, dialog, box, title, content, header, body, footer;

		dFragment = d.createDocumentFragment();

		function newElem(tag, params, parentName){
			var elem = document.createElement(tag);
			for(p in params){
				elem.setAttribute(p, params[p]);
			}
			if(parentName){
				parentName.appendChild(elem);
			}
			return elem;
		}
		// Create wrap
			this.modal = newElem("div",{
				'id': this.options.id,
				'class': this.name + " " + this.options.className
			});

		// Create box
			box = newElem("div",{
				'class': this.name + "__box"
			}, this.modal);

		// Create header
			header = newElem("div",{
				'class': this.name + "__header"
			}, box);

		// Create body
			body = newElem("div",{
				'class': this.name + "__body"
			}, box);

		// Create footer
			footer = newElem("div",{
				'class': this.name + "__footer"
			}, box);


		if(this.options.closeButton == true){
			this.closeButton = newElem("button", {
				'class': this.name + "__close",
				'data-close': this.name
			}, header);
			this.closeButton.innerHTML = "&times;";
		}


		if(typeof this.options.title === "string"){
			title = newElem(this.options.titleTag, {
				'class': this.options.titleClass
			}, header);
			title.innerHTML = this.options.title;
		}


		if(typeof this.options.content === "string"){
			content = this.options.content;
		}else{
			content = this.options.content.innerHTML;
		}
		body.innerHTML = content;


		dFragment.appendChild(this.modal);

		if(this.options.overlay == true){
			this.overlay = newElem("div",{
				'class': this.classes.overlay
			}, dFragment);
		}

		
		d.body.appendChild(dFragment);
	}


	function initialize(){
		
		if(this.overlay){
			this.overlay.addEventListener('click', this.close.bind(this));
		}
		if(this.closeButton){
			this.closeButton.addEventListener('click', this.close.bind(this));
		}
	}

	document.addEventListener("DOMContentLoaded", function(){

		var d = document;
		var classes = {
			active: 'active',
			menuActive: 'vnav__menu_active'
		}

		var modalCollect = [];
		var modalBtn = d.querySelectorAll('[data-func="vmodal"]');
		var modalClass, modalTarget, modalTitle, modalContent;

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


		for(var i = 0; i < modalBtn.length; i++){
			modalBtn[i].addEventListener('click', function(){

				var modalData = this.dataset;

				
				modalContent = modalData.content.replace("#", "");
				
				
				if( ifExist(document.getElementById(modalContent) ) ){

					modalTitle = modalData.title;
					modalID = modalData.id;

					modalCollect[i] = modalID;

					modalCollect[i] = new Modal({
						id: modalID,
						title: modalTitle,
						content: d.getElementById(modalContent)
					}).open();


					if(this.dataset.video != undefined){
						
						var this_modalID = d.getElementById(modalID);
						modalClass = this.dataset.class;
						var this_modalVideoWrap = this_modalID.getElementsByClassName('vmodal__video')[0];
						var this_modalIframe = d.createElement('iframe');
						var this_modalVideo = this.dataset.video;

						addClass(this_modalID, modalClass);
						removeClass(this_modalID, 'vmodal_default');
						addClass(this_modalIframe, 'vmodal__iframe');
						this_modalVideoWrap.appendChild(this_modalIframe);
						this_modalIframe.setAttribute('src', this_modalVideo);

					}

				}else{
					log('No element with ' + modalContent + ' id.');
				}

			});
		}

		// Connect particles
		particlesJS.load('particles-js', 'js/lib/particles.json', function() {
		  console.log('callback - particles.js config loaded');
		});

		// Parallax
		if(document.documentElement.clientWidth > 1025){
			var scenes = document.getElementsByClassName('scene');
			for(var i = 0; i < scenes.length; i++){
				new Parallax(scenes[i]);
			}
		}
		
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