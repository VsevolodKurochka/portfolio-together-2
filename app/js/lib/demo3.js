var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
	var MorphingBG = function () {
		function MorphingBG(el) {
			_classCallCheck(this, MorphingBG);

			this.DOM = {};
			this.DOM.el = el;
			this.DOM.paths = Array.from(this.DOM.el.querySelectorAll('path.animate'));
			this.animate();
		}

		_createClass(MorphingBG, [{
			key: 'animate',
			value: function animate() {
				this.DOM.paths.forEach(function (path) {
					setTimeout(function () {
						anime({
							targets: path,
							duration: anime.random(2000, 3000),
							easing: [0.1, 0, 0.5, 1],
							d: path.getAttribute('pathdata:id'),
							loop: true,
							direction: 'alternate'
						});
					}, anime.random(0, 1000));
				});
			}
		}]);

		return MorphingBG;
	}();

	document.addEventListener('DOMContentLoaded', function () {
		new MorphingBG(document.querySelector('svg.scene'));
	});
};