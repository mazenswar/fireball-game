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
		update(deltaTime) {
			this.player.update(this.input.keys, deltaTime);
		}

		draw() {
			this.player.draw(ctx);
		}
	}
	// END OF GAME CLASS

	const game = new Game({ width: canvas.width, height: canvas.height });
	console.log(game);
	let lastTime = 0;
	// animate
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.draw(ctx);
		game.update(deltaTime);
		requestAnimationFrame(animate);
	}
	animate(0);
	// END OF LOAD LISTENER
});
