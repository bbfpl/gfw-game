import CFW from './Core';

class Animation {
	constructor(sheet, frameTime, sequence, isStop) {
		this.sheet = sheet;
		this.frameTime = frameTime;
		this.sequence = sequence;
		this.isStop = isStop;
		this.tile = this.sequence[0];
		//翻转
		this.flip = {
			x: false,
			y: false
		};
		//中心点
		this.pivot = {
			x: 0,
			y: 0
		};
		//透明度
		this.alpha = 1;
		//角度
		this.angle = 0;

		//计时器
		this.timer = new CFW.Timer();

		this.loopCount = 0;
		this.frame = 0;
	};
	update() {
		let frameTotal = Math.floor(this.timer.delta() / this.frameTime);
		this.loopCount = Math.floor(frameTotal / this.sequence.length);
		if (this.isStop && this.loopCount > 0) {
			this.frame = this.sequence.length - 1;
		} else {
			this.frame = frameTotal % this.sequence.length;
		};
		this.tile = this.sequence[this.frame];
	};
	draw(targetX = 0, targetY = 0) {
		if (this.angle == 0) {
			this.sheet.image.drawTile(
				targetX,
				targetY,
				this.tile,
				this.sheet.width,
				this.sheet.height,
				this.flip.x,
				this.flip.y
			);
		} else {

		}
	}
};

// CFW.Animation = Animation;

export default Animation;