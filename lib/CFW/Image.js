import CFW from './Core';
class ImageManage {
	constructor(path, _onload, _onerror) {
		this.path = path;
		this.loaded = false;

		this._onload = _onload;
		this._onerror = _onerror;

		this.load();
	};
	load() {
		console.log(this.loaded);
		let _this = this;
		_this.data = new Image();
		_this.data.onload = function() {
			_this.loaded = true;
			_this.width = _this.data.width;
			_this.height = _this.data.height;
			//判断是否有onload方法
			if (CFW.isFunction(_this._onload)) {
				_this._onload();
			}
		};
		_this.data.onerror = function() {
			console.log('load error');
			//判断是否有onload方法
			if (CFW.isFunction(_this._onerror)) {
				_this._onerror();
			}
		};
		_this.data.src = this.path;
	};
	draw(targetX = 0, targetY = 0, sourceX = 0, sourceY = 0, width, height) {
		if (!this.loaded) {
			return;
		};
		let scale = CFW.system.scale;
		sourceX = sourceX * scale;
		sourceY = sourceY * scale;

		width = (width || this.width) * scale;
		height = (height || this.height) * scale;

		// let
		CFW.system.context.drawImage(
			this.data,
			sourceX,
			sourceY,
			width,
			height,
			targetX,
			targetY,
			width,
			height
		);
		CFW.Image.drawCount++;
	};
	drawTile(targetX, targetY, tile, tileWidth, tileHeight, flipX, flipY) {
		if (!this.loaded || tileWidth > this.width || tileHeight > this.height) {
			return;
		}

		let tileWidthScaled = tileWidth;
		let tileHeightScaled = tileHeight;

		let scaleX = flipX ? -1 : 1;
		let scaleY = flipY ? -1 : 1;

		CFW.system.context.drawImage(
			this.data,
			Math.floor(tile * tileWidth) % this.width,
			Math.floor(tile * tileWidth / this.width) * tileHeight,
			tileWidthScaled,
			tileHeightScaled,
			targetX * scaleX - (flipX ? tileWidthScaled : 0),
			targetY * scaleY - (flipY ? tileHeightScaled : 0),
			tileWidthScaled,
			tileHeightScaled
		);

		CFW.Image.drawCount++;
	};
};


// CFW.Image = ImageManage;
// CFW.Image.drawCount = 0;

export default ImageManage;