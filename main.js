import { Background } from "./background.js";
import { InputHandler } from "./inputHandler.js";
import { Player } from "./player.js";
import { UI } from "./UI.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemies.js";

addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.height = 500;
	canvas.width = 800;

	class Game {
		constructor({ width, height }) {
			this.score = 0;
			this.winningScore = 2;
			this.fontColor = "black";
			this.debugMode = true;
			this.UI = new UI(this);
			this.width = width;
			this.height = height;
			this.groundMargin = 80;
			this.speed = 0;
			this.maxSpeed = 5;
			this.background = new Background(this);
			this.player = new Player(this);
			this.input = new InputHandler(this);
			this.enemies = [];
			this.particles = [];
			this.collisions = [];
			this.maxParticles = 100;
			this.enemyTimer = 0;
			this.enemyInterval = 2000;
			this.time = 0;
			this.maxTime = 1000 * 30;
			this.gameOver = false;
			this.player.currentState = this.player.states[0];
			this.player.currentState.enter();
		}
		update(deltaTime) {
			// game end condition
			this.time += deltaTime;
			if (this.time > this.maxTime) {
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
				if (enemy.markedForDeletion) {
					this.enemies.splice(this.enemies.indexOf(enemy), 1);
				}
			});
			// handle particles
			this.particles.forEach((particle, index) => {
				particle.update();
				if (particle.markedForDeletion) {
					this.particles.splice(index, 1);
				}
			});
			// max particles
			if (this.particles.length > this.maxParticles) {
				this.particles.length = this.maxParticles;
			}
			// collision animation
			this.collisions.forEach((collision, index) => {
				collision.update(deltaTime);
				if (collision.markedForDeletion) {
					this.collisions.splice(index, 1);
				}
			});
		}

		draw() {
			this.background.draw(ctx);
			this.player.draw(ctx);
			this.enemies.forEach((enemy) => {
				enemy.draw(ctx);
			});
			this.UI.draw(ctx);
			// handle particles
			this.particles.forEach((particle) => {
				particle.draw(ctx);
			});
			// collision animation
			this.collisions.forEach((collision) => {
				collision.draw(ctx);
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
