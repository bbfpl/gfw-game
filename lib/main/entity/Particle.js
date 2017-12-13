
//定义烟花颗粒
class Particle extends CFW.Entity {
    constructor(x = 0, y = 0, settings = {}) {
        super(x, y, settings);


        this.ctx = CFW.system.context;
        //是否固定速度
        this.fixedSpeed = this.settings.fixedSpeed || false;
        //初始化速度
        this.initSpeed = this.settings.initSpeed || 4.5;
        //位置xy
        this.x = x;
        this.y = y;

        //颜色RGB
        this.colorR = this.settings.colorR || ~~(Math.random() * 255);
        this.colorG = this.settings.colorG || ~~(Math.random() * 255);
        this.colorB = this.settings.colorB || ~~(Math.random() * 255);

        //透明度
        this.colorAlpha = this.settings.alpha || 0.5; //0.05
        //圆角
        this.radius = this.settings.radius || 1 + Math.random();
        //速度
        let _speed = (Math.random() * 2 + 0.6);
        this.speed = this.settings.speed || Math.random() * _speed + 0.1;
        if (this.fixedSpeed) {
            this.speed = 1;
        };
        //角度
        this.angle = this.settings.angle || Math.random() * 360;
        //重力
        this.gravity = 1;
        //向量
        this.velocityX = Math.cos(this.angle) * this.speed;
        this.velocityY = Math.sin(this.angle) * this.speed; //+ this.gravity

        this.initVX = this.velocityX;
        this.initVY = this.velocityY;
        //开始时间
        this.startTime = new Date().getTime();
        //期间
        this.duration = Math.random() * 300 + 600;
        //目前期间
        this.currentDuration = 0;
        //减缓速度
        this.dampening = 30;
        //初始颜色
        this.color = this.getColor();
    };
    getColor(r, g, b, a) {
        return 'rgba(' + (r || this.colorR) + ', ' + (g || this.colorG) + ', ' + (b || this.colorB) + ', ' + (a || this.colorAlpha) + ')';
    };
    draw() {
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        //阴影模糊
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.getColor(this.colorR + 150, this.colorG + 150, this.colorB + 150, 1);

        ctx.fill();
    };
    update() {
        this.currentDuration = new Date().getTime() - this.startTime;

        if (this.currentDuration <= 200) {
            this.colorAlpha += 0.01;
            this.x += this.initVX * this.initSpeed;
            this.y += this.initVY * this.initSpeed;
            this.color = this.getColor(240, 240, 240, .9);
        } else {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.color = this.getColor(this.colorR, this.colorG, this.colorB, 0.4 + Math.random() * 0.3);
        };

        this.velocityY += this.gravity / 1000;

        if (this.currentDuration >= this.duration) {
            this.velocityX -= this.velocityX / this.dampening;
            this.velocityY -= this.velocityY / this.dampening;
        };

        if (this.currentDuration >= this.duration + this.duration / 1.1) {
            this.colorAlpha -= 0.02;
            this.color = this.getColor();
            if (this.colorAlpha <= 0) {
                this.kill();
            }
        } else {
            if (this.colorAlpha < 1) {
                this.colorAlpha += 0.03;
            }
        };
    };
};

export default Particle;