class AnimDemo extends CFW.Entity {
    constructor(x = 0, y = 0, settings = {}) {
        super(x, y, settings);
        this.animSheet = new CFW.AnimationSheet('img4', 16, 16);
        this.addAnim('demo', 0.2, [0, 1, 2, 3]);
        // this.timer = new CFW.Timer(1);
    }
    draw() {
        super.draw();
    }
    update() {
        super.update();
        this.pos.x += 1;
    }
};
export default AnimDemo;