classmanager.importc("mathnode/util", "Env").then(() => {
classmanager.importdir("mathnode/physics")}).then(() => {

window.NodeTypes = {
	CONST: 0,
	ADD: 1,
	SUBTRACT: 2,
	MULTIPLY: 3,
	DIVIDE: 4,
	EXPONENT: 5,
	MODULO: 6,
	ROUND: 7,
	CLAMP: 8,
	BUTTON: 9
}
window.NodeActions = [
	function(){},
	function(t){return getInput1(t) + getInput2(t)},
	function(t){return getInput1(t) - getInput2(t)},
	function(t){return getInput1(t) * getInput2(t)},
	function(t){return getInput2(t)!=0?(getInput1(t) / getInput2(t)) :0},
	function(t){return getInput1(t) ^ getInput2(t)},
	function(t){return getInput1(t) % getInput2(t)},
	function(t){
		var m = 10^getInput2(t);
		return Math.round(getInput1(t) * m) / m;
	},
	function(t){return getInput1(t)>=0.5? 1 :0},
	function(t){return NodePhysics.sqrdistance(t.x, t.y, Env.mouseX, Env.mouseY)<=4096? 1 :0}
]
function getInput1(t) {
	return t.input1? t.input1.output :0
}
function getInput2(t) {
	return t.input2? t.input2.output :0
}
window.Node = class {
	constructor(px, py, oType, oInput1, oInput2, oOutput, oExtender, oExtenderState) {
		this.x = px;
		this.y = py;
		this.type = oType || NodeTypes.CONST;
		this.input1 = oInput1 || null;
		this.input2 = oInput2 || null;
		this.output = oOutput || 0;
		this.extender = oExtender || null;
		//this.extenderState = oExtenderState || NodePhysics.calculateExtenderInitialState(this.x, this.y, this.extender);
		Node.list.push(this);
	}

	drawConnections(ctx, cx, cy) {
		ctx.path();
		ctx.temporairily(ctx.strokeStyle("#0000ff"), ctx.lineWidth(16), () => {
			if(this.input1) ctx.drawLine(this.x - cx, (this.y - 24) - cy, this.input1.x - cx, this.input1.y - cy);
			if(this.input2) ctx.drawLine(this.x - cx, (this.y + 24) - cy, this.input2.x - cx, this.input2.y - cy);
			ctx.stroke();
		});
		if(this.extender) {
			ctx.path();
			ctx.temporairily(ctx.strokeStyle("#ffbb00"), ctx.lineWidth(16), () => {
				ctx.drawLine(this.x - cx, this.y - cy, this.extender.x - cx, this.extender.y - cy);
				ctx.stroke();
			});
		}
	}

	drawSelf(ctx, cx, cy) {
		ctx.path();
		ctx.fillStyle("#ff0000",() => {
			ctx.drawCircle(this.x - cx, this.y - cy, 32);
			ctx.fill();
		});
	}

	update() {
		if(this.type != NodeTypes.CONST) this.output = NodeActions[this.type](this);
	}

	static iteration() {
		Node.list.forEach((node) => {
			node.update();
			//NodePhysics.calculate(node);
		});
	}

	static draw(ctx, cx, cy) {
		Node.list.forEach((node) => {
			node.drawConnections(ctx, cx, cy);
		});
		ctx.temporairily(ctx.textFont("16px arial"), ctx.textHalign("center"), ctx.textValign("middle"), () => {
			Node.list.forEach((node) => {
				node.drawSelf(ctx, cx, cy);
				ctx.context.fillText(node.output, node.x - cx, node.y - cy);
			});
		});
	}

}
window.Node.list = [];
});
window.$DESTRUCT = () => {
	delete window.NodeTypes;
	delete window.NodeActions;
	delete window.Node;
}