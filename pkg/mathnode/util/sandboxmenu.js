window.SandboxMenu = {
	load: async(img) => {
		return new Promise((resolve, reject) => {
			var i = new Image();
			i.src = img;
			i.onload = () => {
				resolve(i);
			}
		});
	},
	loadAll: async () => {
		this[0] = await this.load("img/sandbox/menuadd.png");
		this[1] = await this.load("img/sandbox/menurem.png");
		this[2] = await this.load("img/sandbox/menupowertool.png");
		this[3] = await this.load("img/sandbox/menupan.png");
	},
	draw: (ctx) => {
		for(let i in this) {
			let img = this[i];
			if(selectitem == i || NodePhysics.sqrdistance(48, 48 + i * 80, Env.mouseX, mouseY) <= 32) {
				ctx.drawImage(img, 13, 13 + i * 80, 80, 80);
			} else {
				ctx.drawImage(img, 16, 16 + i * 80);
			}
		}
	}
}

window.$DESTRUCT = () => {
	delete window.SandboxMenu;
}