export class FloatingMessage {
	constructor(message, x, y, targetX, targetY) {
		this.message = message;
		this.x = x;
		this.y = y;
		this.targetX = targetX;
		this.targetY = targetY;
		this.markedForDeletion = false;
		this.timer = 0;
	}

	update() {
		this.timer++;
		if (this.timer > 100) {
			this.markedForDeletion = true;
		}
		this.x += (this.targetX - this.x) * 0.02;
		this.y += (this.targetY - this.y) * 0.02;
	}

	draw(context) {
		context.font = "30px Creepster";
		context.fillStyle = "white";
		context.fillText(this.message, this.x, this.y);
		context.fillStyle = "black";
		context.fillText(this.message, this.x + 2, this.y + 2);
	}
}
