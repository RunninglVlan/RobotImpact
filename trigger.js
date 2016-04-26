pc.script.create("trigger", function (app) {
	var START_POSITION_X = -10;

	var Trigger = function (entity) {
		this.entity = entity;

		var inner = {
			onTriggerEnter: function (entity) {
				var position = entity.getPosition();
				position.x = START_POSITION_X;
				entity.rigidbody.teleport(position);
			}
		};
		this._getInner = function () {
			return inner;
		};
	};

	Trigger.prototype = {
		initialize: function () {
			this.entity.collision.on("triggerenter", this._getInner().onTriggerEnter);
		},

		update: function (dt) { }
	};

	return Trigger;
});
