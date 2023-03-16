import { InputHandler } from "./inputHandler.js";
import { Player } from "./player.js";

addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = 500;
	canvas.width = 500;

	class Game {
		constructor({ width, height }) {
			this.width = width;
			this.height = height;
			this.player = new Player(this);
			this.input = new InputHandler();
		}
		update() {
			this.player.update(this.input.keys);
		}

		draw() {
			this.player.draw(ctx);
		}
	}
	// END OF GAME CLASS

	const game = new Game({ width: canvas.width, height: canvas.height });
	console.log(game);

	// animate
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.draw(ctx);
		game.update();
		requestAnimationFrame(animate);
	}
	animate();
	// END OF LOAD LISTENER
});
