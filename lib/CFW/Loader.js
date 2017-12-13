import CFW from './Core';
class Loader {
    constructor(mainClass, resources) {
        this.mainClass = mainClass;
        this.resources = resources;
        this.imagesList = {};
        this.audioList = {};

        this.loadCount = 0;
        this.resourceCount = this.resources.length;

        this._drawStatus = 0;
        this._intervalId = 0;
    };
    load() {
        //默认设置黑色背景
        CFW.system.clear('#000');

        let _self = this;
        //遍历资源
        _self.resources.forEach(function(item, index) {
            _self.loadType(item, _self.onload, _self.onerror);
        });

        this._intervalId = setInterval(this.draw.bind(this), 16);
    };
    //加载完成回调
    onload() {
        this.loadCount++;
        this.checkLoadStatus();
    };
    onerror() {
        console.log('img error:');
    };
    //检查加载状态
    checkLoadStatus() {
        if (this.loadCount == this.resourceCount) {
            setTimeout(this.end.bind(this), 250);
        }
    };


    getLoadProgress() {
        return this.loadCount / this.resourceCount;
    }
    loadType(res, onload, onerror) {

        switch (res.type) {
            case "image":
                this.imagesList[res.name] = new CFW.Image(res.src, onload.bind(this), onerror.bind(this));
                return 1;
            case "audio":

                return 1;
            default:
                throw "load : unknown or invalid resource type : " + res.type;
        }
    }
    getImage(name){
        return this.imagesList[name];
    }
    end() {
        clearInterval(this._intervalId);
        console.log('加载完成了');
        CFW.system.setScene(this.mainClass);
    }
    draw() {

        this._drawStatus = this.getLoadProgress(); //+= (this.status - this._drawStatus) / 5;
        // console.log(this._drawStatus);
        var s = CFW.system.scale;
        var w = CFW.system.width * 0.6;
        var h = CFW.system.height * 0.1;
        var x = CFW.system.width * 0.5 - w / 2;
        var y = CFW.system.height * 0.5 - h / 2;

        // console.log(s, w, h, x, y);

        CFW.system.context.fillStyle = '#000';
        CFW.system.context.fillRect(0, 0, 480, 320);

        CFW.system.context.fillStyle = '#fff';
        CFW.system.context.fillRect(x * s, y * s, w * s, h * s);

        CFW.system.context.fillStyle = '#000';
        CFW.system.context.fillRect(x * s + s, y * s + s, w * s - s - s, h * s - s - s);

        console.log(w * s * this._drawStatus);
        CFW.system.context.fillStyle = '#fff';
        CFW.system.context.fillRect(x * s, y * s, w * s * this._drawStatus, h * s);
    }
};
export default Loader;