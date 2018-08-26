window.Polygon = class {
	constructor(sides) {
		this.pointx = [];
		this.pointy = [];
		this.points = 0;
		if(sides > 1) {
			for(let i = 0; i < sides; i++) {
				this.pointx.push(Math.cos(i));
				this.pointy.push(Math.sin(i));
				this.points++;
			}
		} else {
			console.error("Polygon: Too little sides!");
		}
	}

	forEachPoint(callback) {
		for(let i = 0; i < points; i++) {
			callback(pointx[i], pointy[i]);
		}
	}
}

window.$DESTRUCT = () => {
	delete window.Polygon;
}