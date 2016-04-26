pc.script.attribute("body",  "asset", null, { type: "html" });
pc.script.attribute("style", "asset", null, { type: "css" });

pc.script.create("UI", function (app) {
	var UI = function (entity) {
		this.entity = entity;

		var inner = {
			addElements: function () {
				var outer = this.outer;
				var style = app.assets.get(outer.style);
				document.head.appendChild(pc.createStyle(style.resource));

				var body = app.assets.get(outer.body);
				var div = document.createElement("div");
				div.innerHTML = body.resource;
				document.body.appendChild(div);
			}
		};
		this._getInner = function () {
			return inner;
		};
		inner.outer = this;
	};

	UI.prototype = {
		initialize: function () {
			this._getInner().addElements();
		},

		update: function (dt) { },

		updateGameTime: function (time) {
			document.querySelector("#gameTime").innerHTML = Math.round(time);
		}
	};

	return UI;
});
