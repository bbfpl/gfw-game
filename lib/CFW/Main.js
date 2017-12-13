import CFW from './Core';
import Timer from './Timer';
import Debug from './Debug';
import System from './System';
import Animation from './Animation';
import AnimationSheet from './AnimationSheet';
import Loader from './Loader';
import Image from './Image';
import Entity from './Entity';
import Scene from './Scene';

CFW.System = System;

CFW.Timer = Timer;
CFW.Timer.time = Number.MIN_VALUE;
CFW.Timer.timeScale = 1;
CFW.Timer.maxStep = 0.05;
let _last = 0;
CFW.Timer.step = function() {
    let current = Date.now();
    let delta = (current - _last) / 1000;
    CFW.Timer.time += Math.min(delta, CFW.Timer.maxStep) * CFW.Timer.timeScale;
    _last = current;
};

CFW.Debug = Debug;

CFW.Animation = Animation;
CFW.AnimationSheet = AnimationSheet;

CFW.Loader = Loader;

CFW.Image = Image;
CFW.Image.drawCount = 0;

CFW.Entity = Entity;
CFW.Entity._lastId = 0;

CFW.Scene = Scene;

CFW.main = function(canvasID, mainClass, width, height, scale, loaderClass) {
    CFW.debug = new Debug();
    CFW.system = new System(canvasID, width, height, scale);

    CFW.res = new(loaderClass || CFW.Loader)(mainClass, CFW.resources);
    CFW.res.load();
};

export default CFW;