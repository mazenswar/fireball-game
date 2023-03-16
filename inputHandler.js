export class InputHandler {
	constructor() {
		this.keys = [];
		addEventListener("keydown", (e) => {
			if (
				(e.key === "ArrowDown" ||
					e.key === "ArrowUp" ||
					e.key === "ArrowRight" ||
					e.key === "ArrowLeft" ||
					e.key === "Enter") &&
				this.keys.indexOf(e.key) === -1
			) {
				this.keys.push(e.key);
			}
		});

		addEventListener("keyup", (e) => {
			if (
				e.key === "ArrowDown" ||
				e.key === "ArrowUp" ||
				e.key === "ArrowRight" ||
				e.key === "ArrowLeft" ||
				e.key === "Enter"
			) {
				this.keys.splice(this.keys.indexOf(e.key), 1);
			}
		});
	}
}
