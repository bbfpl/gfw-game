import CFW from './Core';
import Animation from './Animation';
class Entity {
	constructor(x = 0, y = 0, settings = {}) {
		this.pos = {};
		this.id = ++CFW.Entity._lastId;
		this.pos.x = x;
		this.pos.y = y;
		this.settings = settings;
		this.animSheet = null;
		this.currentAnim = null;
		this.anims = {};
	};
	/*
	 *添加动画
	 *name 动画名称
	 *frameTime 1帧/时间
	 *sequence 动画序列
	 *isStop 最后一帧是否停止
	 */
	addAnim(name, frameTime, sequence, isStop = false) {
		if (!this.animSheet) {
			throw ('没有定义animSheet');
		}
		let anim = new Animation(this.animSheet, frameTime, sequence, isStop);
		this.anims[name] = anim;
		if (!this.currentAnim) {
			this.currentAnim = anim;
		};
		return anim;
	};
	draw() {
		if (this.currentAnim) {
			this.currentAnim.draw(this.pos.x, this.pos.y);
		}
	};
	update() {
		if (this.currentAnim) {
			this.currentAnim.update();
		}
	};
	kill() {
		CFW.scene.removeEntity(this);
	};

};
// CFW.Entity = Entity;
// CFW.Entity._lastId = 0;

export default Entity;