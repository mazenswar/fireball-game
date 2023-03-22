import {
	Sitting,
	Running,
	Jumping,
	Falling,
	Rolling,
	Diving,
	Hit,
} from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";

export class Player {
	constructor(game) {
		this.game = game;
		this.width = 100;
		this.height = 91.3;
		this.x = 0;
		this.y = this.game.height - this.height - this.game.groundMargin;
		this.image = document.getElementById("player");
		this.speed = 0;
		this.maxSpeed = 10;
		this.vy = 0;
		this.weight = 1;
		this.frameX = 0;
		this.frameY = 0;
		this.maxFrame;
		this.fps = 20;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
		this.states = [
			new Sitting(this.game),
			new Running(this.game),
			new Jumping(this.game),
			new Falling(this.game),
			new Rolling(this.game),
			new Diving(this.game),
			new Hit(this.game),
		];
	}

	draw(context) {
		if (this.game.debugMode) {
			context.strokeRect(this.x, this.y, this.width, this.height);
		}
		context.drawImage(
			this.image,
			this.frameX * this.width,
			this.frameY * this.height,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
	update(input, deltaTime) {
		this.checkCollision();
		this.currentState.handleInput(input);
		// horizontal movement
		this.x += this.speed;
		if (input.includes("ArrowRight") && this.currentState != this.states[6]) {
			this.speed = this.maxSpeed;
		} else if (
			input.includes("ArrowLeft") &&
			this.currentState != this.states[6]
		) {
			this.speed = -this.maxSpeed;
		} else {
			this.speed = 0;
		}
		// horizontal boundaries
		if (this.x < 0) {
			this.x = 0;
		} else if (this.x + this.width > this.game.width) {
			this.x = this.game.width - this.width;
		}
		// vertical boundaries
		if (this.y > this.game.height - this.height - this.game.groundMargin) {
			this.y = this.game.height - this.height - this.game.groundMargin;
		}
		// vertical movement
		this.y += this.vy;
		if (!this.onGround()) {
			this.vy += this.weight;
		} else {
			this.vy = 0;
		}
		// sprite animation
		if (this.frameTimer > this.frameInterval) {
			this.frameTimer = 0;
			if (this.frameX < this.maxFrame) {
				this.frameX++;
			} else {
				this.frameX = 0;
			}
		} else {
			this.frameTimer += deltaTime;
		}
	}

	onGround() {
		return this.y >= this.game.height - this.height - this.game.groundMargin;
	}

	setState(state, speed) {
		this.currentState = this.states[state];
		this.game.speed = this.game.maxSpeed * speed;
		this.currentState.enter();
	}

	checkCollision() {
		this.game.enemies.forEach((enemy) => {
			if (
				this.x + this.width > enemy.x &&
				this.x < enemy.x + enemy.width &&
				this.y < enemy.y + enemy.height &&
				this.y + this.height > enemy.y
			) {
				// collision detected
				// markedForDeletion
				this.game.collisions.push(
					new CollisionAnimation(
						this.game,
						enemy.x + enemy.width * 0.5,
						enemy.y + enemy.height * 0.5
					)
				);
				enemy.markedForDeletion = true;
				if (
					this.currentState === this.states[4] ||
					this.currentState === this.states[5]
				) {
					this.game.score++;
				} else {
					this.setState(6, 0);
				}
			}
		});
	}
}
