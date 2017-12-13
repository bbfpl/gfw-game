import CFW from './Core';
class Scene {
	constructor() {
		this.clearColor = '#000000';
		this.entities = [];
		this._deferredkill = [];
	};
	spawnEntity(entityClass, x, y, settings = {}) {
		let ent = new(entityClass)(x, y, settings);
		this.entities.push(ent);
		return ent;
	};
	removeEntity(ent) {
		ent._killed = true;
		this._deferredkill.push(ent);
	};
	draw() {
		// console.log('Scene draw');
		if (this.clearColor) {
			CFW.system.clear(this.clearColor);
		};
		this.drawEntities();
	};
	drawEntities() {
		for (let i = 0; i < this.entities.length; i++) {
			let ent = this.entities[i];
			ent.draw();
		}
	};
	update() {
		// console.log('Scene update');
		this.updateEntities();

		for (let i = 0; i < this._deferredkill.length; i++) {
			let ent = this._deferredkill[i];
			for (let ii = this.entities.length; ii--;) {
				if (this.entities[ii] === ent) {
					this.entities.splice(ii, 1);
				}
			}
		};
		this._deferredkill = [];
	};
	updateEntities() {
		for (let i = 0; i < this.entities.length; i++) {
			let ent = this.entities[i];
			if (!ent._killed) {
				ent.update();
			}
		}
	};
	run() {
		this.draw();
		this.update();
	};
};
// CFW.Scene = Scene;
export default Scene;