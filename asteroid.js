pc.script.create("asteroid", function (app) {
	var Asteroid = function (entity) {
		this.entity = entity;

		var inner = {
			direction: pc.Vec3.ZERO,
			speed: pc.math.random(1, 5),
			xMultiplier: pc.math.random(-90, 90),
			yMultiplier: pc.math.random(-90, 90),
			zMultiplier: pc.math.random(-90, 90),

			fly: function (dt) {
				var outer = this.outer;
				if (this.direction != pc.Vec3.ZERO) {
					outer.entity.rotate(this.xMultiplier * dt, this.yMultiplier * dt, this.zMultiplier * dt);
					var direction = this.direction.clone();
					outer.entity.translate(direction.scale(this.speed * dt));
				}
			},

			onCollision: function (other) {
				if ("Player" === other.getName()) {
					other.script.player.removeLive();
				}
			}
		};
		this._getInner = function () {
			return inner;
		};
		inner.outer = this;
	};

	Asteroid.prototype = {
		initialize: function () {
			this.entity.collision.on("triggerenter", this._getInner().onCollision);
		},

		update: function (dt) {
			this._getInner().fly(dt);
		},

		setDirectionFromTarget: function (target) {
			var inner = this._getInner();
			target.z = 0;
			inner.direction = target.sub(this.entity.getPosition());
			inner.direction = inner.direction.normalize().clone();
		}
	};

	return Asteroid;
});
