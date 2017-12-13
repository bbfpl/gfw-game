import CFW from './Core';
class Debug {
	constructor() {
		this.debugTime = 0;
		this.debugTickAvg = 0.016;
		this.debugRealTime = Date.now();

		this.init();
	};
	init() {
		this.container = CFW.$new('div');
		this.container.className = 'cfw_debug';
		CFW.$('body')[0].appendChild(this.container);

		this.canvasContainer = CFW.$new('canvas');
		this.canvasContainer.className = 'cfw_debug_starts';
		this.container.appendChild(this.canvasContainer);

		this.getCanvas(this.canvasContainer);

	};
	getCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.canvas.width = window.innerWidth;
		this.canvas.height = 150;
	};
	text(data) {
		let context = this.context;
		context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
		context.fillStyle = '#fff';
		context.font = "20px Arial"; //设置字体大小和字体
		//绘制字体，并且指定位置
		let _w = this.canvas.width / data.length;
		data.forEach(function(value, index) {
			context.fillText(value.name + ':' + value.number, index * _w, 20);
		});

		context.stroke(); //执行绘制
		context.restore();
	};

	beforeRun() {
		let timeBeforeRun = Date.now();
		this.debugTickAvg = this.debugTickAvg * 0.8 + (timeBeforeRun - this.debugRealTime) * 0.2;
		this.debugRealTime = timeBeforeRun;
	};
	afterRun() {
		let frameTime = Date.now() - this.debugRealTime;
		let nextFrameDue = (1000 / CFW.CONFIG.FPS) - frameTime;

		this.debugTime = this.debugTime * 0.8 + frameTime * 0.2;

		let _ms = this.debugTime.toFixed(2);

		let _fps = Math.round(1000 / this.debugTickAvg);
		//draws
		//entities
		let _entities = 0;
		if (CFW.scene && CFW.scene.entities) {
			_entities = CFW.scene.entities.length;
		}

		this.run([{
			name: 'ms',
			number: _ms
		}, {
			name: 'fps',
			number: _fps
		}, {
			name: 'entities',
			number: _entities
		}, {
			name: 'draw',
			number: CFW.Image.drawCount
		}]);

		CFW.Image.drawCount = 0;
	};
	run(data) {
		this.context.fillStyle = '#000';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.text(data);

	}
};
// CFW.Debug = Debug;
export default Debug;