pc.script.create("cameraControls", function (app) {
	var CameraControls = function (entity) {
		this.entity = entity;

		var inner = {
			mouseXRotation: 0,
			mouseYRotation: 0
		};
		this._getInner = function () {
			return inner;
		};
	};

	CameraControls.prototype = {
		initialize: function () {
			var inner = this._getInner();
			inner.mouseXRotation = this.entity.getLocalEulerAngles().x;
			inner.mouseYRotation = this.entity.getLocalEulerAngles().y;
		},

		update: function (dt) {
			var inner = this._getInner();
			if (app.keyboard.isPressed(pc.KEY_J)) {
				inner.mouseYRotation--;
			}
			if (app.keyboard.isPressed(pc.KEY_L)) {
				inner.mouseYRotation++;
			}
			if (app.keyboard.isPressed(pc.KEY_I)) {
				inner.mouseXRotation--;
			}
			if (app.keyboard.isPressed(pc.KEY_K)) {
				inner.mouseXRotation++;
			}
			this.entity.setLocalEulerAngles(-inner.mouseXRotation, -inner.mouseYRotation, 0);
		}
	};

	return CameraControls;
});
