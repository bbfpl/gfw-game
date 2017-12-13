import CFW from './Core';

class System {
	constructor(canvas, width, height, scale = 1) {
		//是否运行
		this.running = false;
		//新场景类
		this.newSceneClass = null;
		this.delegate = null;

		this.canvas = CFW.$(canvas);
		this.context = this.canvas.getContext('2d');

		this.scale = scale;

		this.resize(width, height, scale);
	};
	resize(width, height, scale) {
		this.width = width;
		this.height = height;

		// this.realWidth = this.width * scale;
		// this.realHeight = this.height * scale;

		this.canvas.width = this.width;
		this.canvas.height = this.height;
	};

	setScene(sceneClass) {
		if (this.running) {
			this.newSceneClass = sceneClass;
		} else {
			this.setNowScene(sceneClass);
		}
	};
	setNowScene(sceneClass) {
		CFW.scene = new sceneClass;
		this.setDelegate(CFW.scene);
	};
	setDelegate(scene) {
		if (typeof(scene.run) == 'function') {
			this.delegate = scene;
			this.startRun();
		} else {
			throw ('System.setDelegate:no run() function')
		}
	};
	startRun() {
		let _this = this;
		// this.run();
		CFW.setAnimation(function() {
			_this.run();
		}, this.canvas);
		this.running = true;
	};
	stopRun() {
		this.running = false;
	};
	run() {
		//计时器
		CFW.Timer.step();

		if (CFW.CONFIG.DEBUG) {
			CFW.debug.beforeRun();
		}


		this.delegate.run();
		//判断是否是新场景 是就切换
		if (this.newSceneClass) {
			this.setNowScene(this.newSceneClass);
			this.newSceneClass = null;
		}
		if (CFW.CONFIG.DEBUG) {
			CFW.debug.afterRun();
		}
	};
	clear(color) {
		this.context.fillStyle = color;
		this.context.fillRect(0, 0, this.width, this.height);
	}

};

// CFW.System = System;
export default System;