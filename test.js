pc.script.create("test", function (app) {
	var Test = function (entity) {
		this.entity = entity;
	};

	Test.prototype = {
		initialize: function () {
			// Disable lights for material, it can't be done in Editor
			//this.entity.model.model.meshInstances[0].mask = 0;
		},

		update: function (dt) { }
	};

	return Test;
});
