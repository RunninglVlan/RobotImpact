pc.script.create("robotHolder", function (app) {
	var VELOCITY = new pc.Vec3(10,0,0);

	var RobotHolder = function (entity) {
		this.entity = entity;
	};

	RobotHolder.prototype = {
		initialize: function () { },

		update: function (dt) {
			this.entity.rigidbody.linearVelocity = VELOCITY;
		}
	};

	return RobotHolder;
});
