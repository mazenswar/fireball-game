class Layer {
	constructor({ game, width, height, speedModifier, image }) {
		this.game = game;
		this.width = width;
		this.height = height;
		this.speedModifier = speedModifier;
		this.image = image;
		this.x = 0;
		this.y = 0;
	}

	update() {
		if (this.x < -this.width) {
			this.x = 0;
		} else {
			this.x -= this.game.speed * this.speedModifier;
		}
	}

	draw(context) {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
		context.drawImage(
			this.image,
			this.x + this.width,
			this.y,
			this.width,
			this.height
		);
	}
}

export class Background {
	constructor(game) {
		this.game = game;
		this.width = 1667;
		this.height = 500;
		this.layer1Image = document.getElementById("layer-1");
		this.layer2Image = document.getElementById("layer-2");
		this.layer3Image = document.getElementById("layer-3");
		this.layer4Image = document.getElementById("layer-4");
		this.layer5Image = document.getElementById("layer-5");
		this.layer1 = new Layer({
			game: this.game,
			width: this.width,
			height: this.height,
			speedModifier: 0,
			image: this.layer1Image,
		});
		this.layer2 = new Layer({
			game: this.game,
			width: this.width,
			height: this.height,
			speedModifier: 0.2,
			image: this.layer2Image,
		});
		this.layer3 = new Layer({
			game: this.game,
			width: this.width,
			height: this.height,
			speedModifier: 0.4,
			image: this.layer3Image,
		});
		this.layer4 = new Layer({
			game: this.game,
			width: this.width,
			height: this.height,
			speedModifier: 0.8,
			image: this.layer4Image,
		});
		this.layer5 = new Layer({
			game: this.game,
			width: this.width,
			height: this.height,
			speedModifier: 1,
			image: this.layer5Image,
		});
		this.backgroundLayers = [
			this.layer1,
			this.layer2,
			this.layer3,
			this.layer4,
			this.layer5,
		];
	}

	update() {
		this.backgroundLayers.forEach((layer) => {
			layer.update();
		});
	}
	draw(context) {
		this.backgroundLayers.forEach((layer) => {
			layer.draw(context);
		});
	}
}
