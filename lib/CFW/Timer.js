import CFW from './Core';

class Timer {
	constructor(seconds = 0) {
		this.target = seconds;
		this.base = CFW.Timer.time;
		this.last = CFW.Timer.time;
		this.pausedAt = 0;
	};
	//变量增量
	delta() {
		return (this.pausedAt || CFW.Timer.time) - this.base - this.target;
	}
};



export default Timer;