export class InputHandler {
	constructor(game) {
		this.game = game;
		this.keys = [];
		addEventListener("keydown", (e) => {
			if (
				(e.key === "ArrowDown" ||
					e.key === "ArrowUp" ||
					e.key === "ArrowRight" ||
					e.key === "ArrowLeft" ||
					e.key === " ") &&
				this.keys.indexOf(e.key) === -1
			) {
				this.keys.push(e.key);
			} else if (e.key === "d") {
				this.game.debugMode = !this.game.debugMode;
			}
		});

		addEventListener("keyup", (e) => {
			if (
				e.key === "ArrowDown" ||
				e.key === "ArrowUp" ||
				e.key === "ArrowRight" ||
				e.key === "ArrowLeft" ||
				e.key === " "
			) {
				this.keys.splice(this.keys.indexOf(e.key), 1);
			}
		});
	}
}
