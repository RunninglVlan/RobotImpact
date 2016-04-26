pc.script.create("game", function (app) {
	var States = {
		GAME: "game",
		WIN:  "win",
		LOSS: "loss"
	};

	var Game = function (entity) {
		this.entity = entity;

		var inner = {
			state: null,
			playerScript: null,
			uiScript: null,
			gameTime: 0,

			restart: function () {
				this.state = States.GAME;
				this.playerScript.restart();
			},

			updateTime: function () {
				this.uiScript.updateGameTime(this.gameTime);
			}
		};
		this._getInner = function () {
			return inner;
		};
	};

	Game.prototype = {
		initialize: function () {
			var inner = this._getInner();
			inner.playerScript = app.root.findByName("Player").script.player;
			inner.uiScript = this.entity.script.UI;
			inner.restart();
		},

		update: function (dt) {
			var inner = this._getInner();
			switch (inner.state) {
				case States.GAME:
					if (!inner.playerScript.isAlive()) {
						inner.state = States.LOSS;
					}
					inner.gameTime += dt;
					inner.updateTime();
					break;
				case States.LOSS:
					inner.restart();
					break;
				case States.WIN:
					break;
			}
		}
	};

	return Game;
});
