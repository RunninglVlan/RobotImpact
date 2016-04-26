pc.script.create("player", function (app) {
	var TIME_200MS = 200;

	var Player = function (entity) {
		this.entity = entity;

		var inner = {
			lives: 0,
			interval: null,
			start: new pc.Vec3(0, 0, 0)
		};
		this._getInner = function () {
			return inner;
		};
	};

	Player.prototype = {
		initialize: function () {
			this.restart();
		},

		update: function (dt) { },

		removeLive: function () {
			var inner = this._getInner();
			if (inner.interval === null) {
				document.getElementsByClassName("rotated")[inner.lives-1].className = "rotated disabled";
				inner.lives--;
				this.moveToStart();
				var counter = 0;
				var rocket = this.entity.getChildren()[0];
				inner.interval = window.setInterval(function () {
					rocket.enabled = !rocket.enabled;
					if (counter > 6) {
						window.clearInterval(inner.interval);
						inner.interval = null;
					}
					counter++;
				}, TIME_200MS);
			}
		},

		isAlive: function () {
			return this._getInner().lives > 0;
		},

		moveToStart: function () {
			this.entity.rigidbody.teleport(this._getInner().start);
		},

		updateStart: function (position) {
			this._getInner().start.set(position.x + 10, position.y, position.z);
		},

		restart: function () {
			this._getInner().lives = 3;
			var rocketImages = document.getElementsByClassName("rotated");
			for (var i = 0; i < rocketImages.length; i++) {
				rocketImages[i].className = "rotated";
			}
		}
	};

	return Player;
});
