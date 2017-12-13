import CFW from '../../CFW/Main';
import Particle from '../entity/Particle';
import AnimDemo from '../entity/ADemo';

//定义一个demo场景
class MainScene extends CFW.Scene {
    constructor() {
        super();
        this.clearColor = '#000';
        this.sceneName = 'Fireworks';
        this._index = 0;
        console.log('初始化');

        console.log(CFW);
        this.demoimage = CFW.res.getImage('img1');
        this.demoimage1 = CFW.res.getImage('img2');


        this.spawnEntity(AnimDemo);


        // var _self = this;
        // this.timer = new CFW.Timer(1);

        // var x = Math.ceil(Math.random() * 500);
        // var y = Math.ceil(Math.random() * 300);


        // this.showFireworks(x, y);

    };
    showFireworks(x, y) {
        for (var i = 0; i < 30; i++) {
            this.spawnEntity(Particle, x, y, {
                fixedSpeed: true,
                colorR: '255',
                colorG: '255',
                colorB: '255',
            });
        };
        for (var i = 0; i < 20; i++) {
            this.spawnEntity(Particle, x, y, {
                initSpeed: 0.5,
                colorR: '255',
                colorG: '255',
                colorB: '255',
            });
        };
        for (var i = 0; i < 20; i++) {
            this.spawnEntity(Particle, x, y, {
                initSpeed: 1,
                fixedSpeed: true,
                colorR: '255',
                // colorG: '255',
                colorB: '255',
            });
        };
    };
    draw() {
        super.draw(); //继承父函数 一般来说都继承 不写就是覆盖重构
        // this.demoimage.draw();
        // this.demoimage1.draw();
    };
    update() {
        super.update();
    };
};
export default MainScene;