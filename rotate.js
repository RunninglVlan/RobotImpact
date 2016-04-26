pc.script.attribute("speed", "number", 1);
pc.script.attribute("rotateX", "boolean", false);
pc.script.attribute("rotateY", "boolean", true);
pc.script.attribute("rotateZ", "boolean", false);

pc.script.create("rotate", function (app) {
	var Rotate = function (entity) {
		this.entity = entity;

		var inner = {
			rotate: function (dt) {
				var outer = this.outer;
				var rotateAngle = Math.random() * 360;
				if (dt !== undefined) {
					rotateAngle = dt;
				}

				if (outer.rotateX) {
					outer.entity.rotate(rotateAngle * outer.speed, 0, 0);
				} else if (outer.rotateY) {
					outer.entity.rotate(0, rotateAngle * outer.speed, 0);
				} else if (outer.rotateZ) {
					outer.entity.rotate(0, 0, rotateAngle * outer.speed);
				}
			}
		};
		this._getInner = function () {
			return inner;
		};
		inner.outer = this;
	};

	Rotate.prototype = {
		initialize: function () {
			this._getInner().rotate();
		},

		update: function (dt) {
			this._getInner().rotate(dt);
		}
	};

	return Rotate;
});
