import CFW from '../CFW/Main';

//加载main场景 一般是主画面
import MainScene from './scene/MainScene';
import resource from './resource';


let innerWidth = window.innerWidth; //480
let innerHeight = window.innerHeight; //320
let scale = innerWidth / 640;

CFW.main('#canvas', MainScene, innerWidth, innerHeight, scale);