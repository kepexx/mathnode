window.NodePhysics = {
	calculateExtenderInitialState: (x, y, extender) => {
		if(extender == undefined) return null;
		return {
			//maxdist: 
		}
	},
	calculateExtenderState: (x, y, extender) => {
		if(extender == undefined) return null;
		return {
			//maxdist: 
		}
	},
	sqrdistance: (x1, y1, x2, y2) => {
		var x = NodePhysics.relativize(x1, x2);
		var y = NodePhysics.relativize(y1, y2);
		return x*x+y*y;
	},
	relativize: (a, b) => {
		return b - a;
	}
}
window.$DESTRUCT = () => {
	delete window.NodePhysics;
}