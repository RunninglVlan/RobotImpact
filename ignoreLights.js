pc.script.create("ignoreLights", function (app) {
	var IgnoreLights = function (entity) {
		this.entity = entity;
	};

	IgnoreLights.prototype = {
		initialize: function () {
			// Disable lights for material, it's not supported in Editor yet
			this.entity.model.model.meshInstances[0].mask = 0;
		},

		update: function (dt) { }
	};

	return IgnoreLights;
});
