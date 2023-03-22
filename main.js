import { Background } from "./background.js";
import { InputHandler } from "./inputHandler.js";
import { Player } from "./player.js";
import { UI } from "./UI.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemies.js";

addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = 500;
	canvas.width = 900;

	class Game {
		constructor({ width, height }) {
			this.score = 0;
			this.winningScore = 15;
			this.fontColor = "orange";
			this.shadowColor = "black";
			this.debugMode = false;
			this.UI = new UI(this);
			this.width = width;
			this.height = height;
			this.groundMargin = 50;
			this.speed = 0;
			this.maxSpeed = 5;
			this.background = new Background(this);
			this.player = new Player(this);
			this.input = new InputHandler(this);
			this.enemies = [];
			this.particles = [];
			this.collisions = [];
			this.floatingMessages = [];
			this.maxParticles = 100;
			this.enemyTimer = 0;
			this.enemyInterval = 2000;
			this.maxTime = 1000 * 30;
			this.time = this.maxTime;
			this.gameOver = false;
			this.player.currentState = this.player.states[0];
			this.player.currentState.enter();
		}
		update(deltaTime) {
			// game end condition
			this.time -= deltaTime;
			if (this.time < 1) {
				this.time = 0;
				this.gameOver = true;
			}
			this.background.update();
			this.player.update(this.input.keys, deltaTime);
			// handle enemies
			if (this.enemyTimer > this.enemyInterval) {
				this.addEnemy();
				this.enemyTimer = 0;
			} else {
				this.enemyTimer += deltaTime;
			}
			this.enemies.forEach((enemy) => {
				enemy.update(deltaTime);
			});
			// floating messages
			this.floatingMessages.forEach((message) => {
				message.update();
			});
			// handle particles
			this.particles.forEach((particle, index) => {
				particle.update();
			});
			// max particles
			if (this.particles.length > this.maxParticles) {
				this.particles.length = this.maxParticles;
			}
			// collision animation
			this.collisions.forEach((collision, index) => {
				collision.update(deltaTime);
			});
			// remove marked for delete
			this.collisions = this.collisions.filter(
				(collision) => !collision.markedForDeletion
			);
			this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
			this.particles = this.particles.filter(
				(particle) => !particle.markedForDeletion
			);
			this.floatingMessages = this.floatingMessages.filter(
				(message) => !message.markedForDeletion
			);
		}

		draw(context) {
			this.background.draw(context);
			this.player.draw(context);
			this.enemies.forEach((enemy) => {
				enemy.draw(context);
			});
			this.UI.draw(context);
			// floating messages

			this.floatingMessages.forEach((message) => {
				message.draw(context);
			});
			// handle particles
			this.particles.forEach((particle) => {
				particle.draw(context);
			});
			// collision animation
			this.collisions.forEach((collision) => {
				collision.draw(context);
			});
		}

		addEnemy() {
			if (this.speed > 0 && Math.random() < 0.5) {
				this.enemies.push(new GroundEnemy(this));
			} else if (this.speed > 0) {
				this.enemies.push(new ClimbingEnemy(this));
			}
			this.enemies.push(new FlyingEnemy(this));
		}
	}
	// END OF GAME CLASS

	const game = new Game({ width: canvas.width, height: canvas.height });
	let lastTime = 0;
	// animate
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.update(deltaTime);
		game.draw(ctx);
		if (!game.gameOver) {
			requestAnimationFrame(animate);
		}
	}
	animate(0);
	// END OF LOAD LISTENER
});
