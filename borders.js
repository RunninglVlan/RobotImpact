pc.script.create("borders", function (app) {
	var TIME_100MS = 100;

	var Borders = function (entity) {
		this.entity = entity;

		var inner = {
			top: null,
			bottom: null,
			left: null,
			right: null,
			playerScript: null,

			resizeBorder: function () {
				window.setTimeout(function () {
					var gameCamera = app.root.findByName("Camera");
					var leftTopCorner  = gameCamera.camera.screenToWorld(0, 0, gameCamera.getPosition().z);
					var position = this.top.getPosition();
					position.y = leftTopCorner.y;
					this.top.rigidbody.teleport(position);

					position = this.bottom.getPosition();
					position.y = -leftTopCorner.y;
					this.bottom.rigidbody.teleport(position);

					position = this.left.getPosition();
					position.x = leftTopCorner.x;
					this.left.rigidbody.teleport(position);

					position = this.right.getPosition();
					position.x = -leftTopCorner.x;
					this.right.rigidbody.teleport(position);

					this.playerScript.updateStart(this.left.getPosition());
					this.playerScript.moveToStart();
				}.bind(this), TIME_100MS);
			}
		};
		this._getInner = function () {
			return inner;
		};
	};

	Borders.prototype = {
		initialize: function () {
			var inner = this._getInner();
			inner.top = this.entity.findByName("Top");
			inner.bottom = this.entity.findByName("Bottom");
			inner.left = this.entity.findByName("Left");
			inner.right = this.entity.findByName("Right");
			inner.playerScript = app.root.findByName("Player").script.player;
			inner.resizeBorder();
			window.addEventListener("resize", inner.resizeBorder.bind(inner));
		},

		update: function (dt) { }
	};

	return Borders;
});