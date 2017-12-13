import CFW from './Core';

class AnimationSheet {
	constructor(name, width = 4, height = 4) {
		this.width = width;
		this.height = height;
		this.image = CFW.res.getImage(name);//new CFW.Image(path);
	}
};
// CFW.AnimationSheet = AnimationSheet;
export default AnimationSheet;