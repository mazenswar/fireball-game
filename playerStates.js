states = {
	SITTING: 0,
	RUNNNING: 1,
	JUMPING: 2,
	FALLING: 3,
};

class State {
	constructor(state) {
		this.state = state;
	}
}

class Sitting {
	constructor(player) {
		super("SITTING");
		this.player = player;
	}

	enter() {}
	handleInput(input) {}
}

class Running {
	constructor(player) {
		super("RUNNING");
		this.player = player;
	}

	enter() {}
	handleInput(input) {}
}

class Jumping {
	constructor(player) {
		super("JUMPING");
		this.player = player;
	}

	enter() {}
	handleInput(input) {}
}

class Falling {
	constructor(player) {
		super("FALLING");
		this.player = player;
	}

	enter() {}
	handleInput(input) {}
}
