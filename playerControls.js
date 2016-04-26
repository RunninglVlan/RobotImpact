pc.script.attribute("speed", "number", 500);

pc.script.create("playerControls", function (app) {
	var Actions = {
		UP:    "up",
		DOWN:  "down",
		LEFT:  "left",
		RIGHT: "right"
	};
	var MS_DELAY = 1000 / 25;

	var PlayerControls = function (entity) {
		this.entity = entity;

		var inner = {
			// Is used for impulse/linearVelocity
			vector: new pc.Vec3(),
			controller: new pc.Controller(window),
			useLinearVelocity: false,
			lastUpdate: 0
		};
		this._getInner = function () {
			return inner;
		};
		inner.controller.registerKeys(Actions.UP,    [pc.KEY_UP,    pc.KEY_W]);
		inner.controller.registerKeys(Actions.DOWN,  [pc.KEY_DOWN,  pc.KEY_S]);
		inner.controller.registerKeys(Actions.LEFT,  [pc.KEY_LEFT,  pc.KEY_A]);
		inner.controller.registerKeys(Actions.RIGHT, [pc.KEY_RIGHT, pc.KEY_D]);
		
		var preventDefault = function (event) {
			if (event.event) {
				event = event.event;
			}
			event.preventDefault();
		};
		app.keyboard.on(pc.EVENT_KEYDOWN, preventDefault);
		document.oncontextmenu = preventDefault;
		window.focus();
	};

	PlayerControls.prototype = {
		initialize: function () {
			// Disable gravity for dynamic rigidBody
			this.entity.rigidbody.system.setGravity(pc.Vec3.ZERO);
		},

		update: function (dt) {
			var inner = this._getInner();
			if (app.keyboard.wasPressed(pc.KEY_L)) {
				inner.useLinearVelocity = !inner.useLinearVelocity;
			}

			var now = Date.now();
			if (now - inner.lastUpdate < MS_DELAY) return;
			inner.lastUpdate = now;

			inner.vector.set(0, 0, 0);
			if (inner.controller.isPressed(Actions.UP)) {
				inner.vector.y++;
			}
			if (inner.controller.isPressed(Actions.DOWN)) {
				inner.vector.y--;
			}
			if (inner.controller.isPressed(Actions.LEFT)) {
				inner.vector.x--;
			}
			if (inner.controller.isPressed(Actions.RIGHT)) {
				inner.vector.x++;
			}
			if (inner.vector.length() > 0) {
				inner.vector.normalize();
			}

			var scaledVector = inner.vector.scale(this.speed * dt);
			if (inner.useLinearVelocity) {
				this.entity.rigidbody.linearVelocity = scaledVector;
			} else {
				this.entity.rigidbody.applyImpulse(scaledVector);
			}
		}
	};

	return PlayerControls;
});
