window.ContextDrawer = class {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.grad = this.context.createRadialGradient(this.canvas.width/2, this.canvas.height/2, 50, this.canvas.width/2, this.canvas.height/2, this.canvas.width/3);
		this.grad.addColorStop(0, "#ffffff");
		this.grad.addColorStop(1, "#efefef");
		this.context.lineWidth = 2;
	}

	drawPolygon(x, y, p, radius) {
		this.context.moveTo(x + radius, y);
		p.forEachPoint((px, py) => {
			this.context.lineTo(x + px * radius, y + py * radius);
		})
	}

	drawLine(x1, y1, x2, y2) {
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
	}

	drawCircle(x, y, rad) {
		this.context.arc(x, y, rad, 0, 2*Math.PI);
	}

	drawPartialCircle(x, y, amt, anticlock) {
		this.context.arc(x, y, rad, 0, amt*2*Math.PI, anticlock);
	}

	path() {
		this.context.beginPath();
	}

	fill() {
		this.context.fill();
	}

	stroke() {
		this.context.stroke();
	}

	fillStyle(clr, draw) {
		var func = (dr) => {
			var c = this.context.fillStyle;
			this.context.fillStyle = clr;
			dr();
			this.context.fillStyle = c;
		}
		if(!draw) {
			return func;
		} else {
			func(draw);
		}
	}

	strokeStyle(clr, draw) {
		var func = (dr) => {
			var c = this.context.strokeStyle;
			this.context.strokeStyle = clr;
			dr();
			this.context.strokeStyle = c;
		}
		if(!draw) {
			return func;
		} else {
			func(draw);
		}
	}

	lineWidth(wid, draw) {
		var func = (dr) => {
			var c = this.context.lineWidth;
			this.context.lineWidth = wid;
			dr();
			this.context.lineWidth = c;
		}
		if(!draw) {
			return func;
		} else {
			func(draw);
		}
	}

	textHalign(wid, draw) {
		var func = (dr) => {
			var c = this.context.textAlign;
			this.context.textAlign = wid;
			dr();
			this.context.textAlign = c;
		}
		if(!draw) {
			return func;
		} else {
			func(draw);
		}
	}

	textValign(wid, draw) {
		var func = (dr) => {
			var c = this.context.textBaseline;
			this.context.textBaseline = wid;
			dr();
			this.context.textBaseline = c;
		}
		if(!draw) {
			return func;
		} else {
			func(draw);
		}
	}

	textFont(fnt, draw) {
		var func = (dr) => {
			var c = this.context.font;
			this.context.font = fnt;
			dr();
			this.context.font = c;
		}
		if(!draw) {
			return func;
		} else {
			func(draw);
		}
	}

	temporairily() {
		var callback;
		var modi = [];
		for(let i in arguments) {
			if(i == arguments.length - 1) {
				callback = arguments[i];
			} else {
				modi.push(arguments[i]);
			}
		}
		recurse(modi, callback);
		function recurse(array, final, i) {
			if(i >= array.length) {
				final();
				return;
			}
			array[i || 0](() => {recurse(array, final, (i || 0) + 1)});
		}
	}

	grid(x, y, gridsize) {
		var xoffset = x % gridsize;
		var yoffset = y % gridsize;
		this.path();
		for(let x = 0; x < this.canvas.width / gridsize; x++) {
			let xx = x * gridsize;
			this.drawLine(xx, 0, xx, this.canvas.height);
		}
		for(let y = 0; y < this.canvas.width / gridsize; y++) {
			let yy = y * gridsize;
			this.drawLine(0, yy, this.canvas.width, yy);
		}
		this.stroke();
	}

	drawBackground(x, y) {
		this.fillStyle(this.grad, () => {
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		})
		this.strokeStyle("#999999", () => {
			this.grid(x, y, 64);
		})
	}

}
window.$DESTRUCT = () => {
	delete window.ContextDrawer;
}