pc.script.create("asteroidManager", function (app) {
	var NUM_ASTEROIDS = 10;
	var START_BORDER_NAME = "Right";
	var END_BORDER_NAME = "Left";

	var AsteroidManager = function (entity) {
		this.entity = entity;

		var inner = {
			player: null,
			border: null,
			asteroids: [],
			clones: [],

			addAsteroid: function () {
				var randomIndex = Math.floor(Math.random() * this.asteroids.length);
				var clone = this.asteroids[randomIndex].clone();
				clone.setPosition(this.getRandomPositionFrom(this.border.start.getPosition()));
				this.clones.push(clone);
				app.root.addChild(clone);
				clone.script.asteroid.setDirectionFromTarget(this.getRandomPositionFrom(this.player.getPosition()));
			},

			getRandomPositionFrom: function (position) {
				var topPosition = this.border.top.getPosition();
				var bottomPosition = this.border.bottom.getPosition();
				var randomY = Math.floor(pc.math.random(bottomPosition.y, topPosition.y));
				position.y = randomY;
				return position;
			},

			isBeyondBorder: function (i) {
				if (this.border.end.getPosition().x > this.border.start.getPosition().x) {
					return this.clones[i].getPosition().x > this.border.end.getPosition().x;
				} else {
					return this.clones[i].getPosition().x < this.border.end.getPosition().x;
				}
			},

			addNewAsteroidsAndDestroyOldOnes: function () {
				if (this.clones.length < NUM_ASTEROIDS) {
					this.addAsteroid();
				}
				for (var i = 0; i < this.clones.length; i++) {
					if (this.isBeyondBorder(i)) {
						var cloneToDestroy = this.clones.splice(i, 1).pop();
						cloneToDestroy.destroy();
					}
				}
			}
		};
		this._getInner = function () {
			return inner;
		};
	};

	AsteroidManager.prototype = {
		initialize: function () {
			var inner = this._getInner();
			inner.player = app.root.findByName("Player");

			var borders = app.root.findByName("Borders");
			inner.border = {
				top: borders.findByName("Top"),
				bottom: borders.findByName("Bottom"),
				start: borders.findByName(START_BORDER_NAME),
				end: borders.findByName(END_BORDER_NAME)
			};

			inner.asteroids.push(this.entity.findByName("AsteroidSmall"));
			inner.asteroids.push(this.entity.findByName("AsteroidBig"));
			inner.asteroids.push(this.entity.findByName("AsteroidSmall2"));
			inner.asteroids.push(this.entity.findByName("AsteroidBig2"));
		},

		update: function (dt) {
			this._getInner().addNewAsteroidsAndDestroyOldOnes();
		}
	};

	return AsteroidManager;
});
