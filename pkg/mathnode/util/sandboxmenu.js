window.SandboxMenu = {
	selectitem: -1,
	grid: true,
	load: () => {
		this[0] = document.getElementById('img-sandbox-menuadd');
		this[1] = document.getElementById('img-sandbox-menurem');
		this[2] = document.getElementById('img-sandbox-menupowertool');
		this[3] = document.getElementById('img-sandbox-menupan');
	},
	draw: (ctx) => {
		for(let i = 0; i < 4; i++) {
			let img = this[i];
			if(NodePhysics.sqrdistance(48, 48 + i * 80, Env.mouseX, Env.mouseY) <= 1024) {
				ctx.context.drawImage(img, 13, 13 + (i * 80), 70, 70);
				if(Env.mousePressed[0]) {
					SandboxMenu.selectitem = i;
					Env.mouseDown[0] = false;
					Env.mousePressed[0] = false;
				}
			} else if(SandboxMenu.selectitem == i) {
				ctx.context.drawImage(img, 13, 13 + (i * 80), 70, 70);
			} else {
				ctx.context.drawImage(img, 16, 16 + i * 80);
			}
		}
	},
	tools: () => {
		switch(SandboxMenu.selectitem) {
			case 0:
				if(!Env.mouseDown[0]) break;
				let anyNode = false;
				let snapx = SandboxMenu.grid? Env.mouseX : Math.floor(Env.mouseX / 64) * 64 + 32,
					snapy = SandboxMenu.grid? Env.mouseY : Math.floor(Env.mouseY / 64) * 64 + 32;
				for(let node of Node.list) {
					if(NodePhysics.sqrdistance(node.x, node.y, snapx, snapy) < 4096) {
						anyNode = true;
						break;
					}
				}
				if(!anyNode) SandboxMenu.selectnode = new Node(snapx, snapy);
				break;
		}
	}

}

window.$DESTRUCT = () => {
	delete window.SandboxMenu;
}