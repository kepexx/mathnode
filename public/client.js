window.classmanager = manager();
classmanager.importdir("mathnode")        .then(() => {
classmanager.importdir("mathnode/display").then(() => {
classmanager.importdir("mathnode/util")   .then(() => {

SandboxMenu.load();
var draw = new ContextDrawer(document.getElementById('canvas'));
var node = new Node(draw.canvas.width/2, draw.canvas.height/2, 1, new Node(64, 64, 0, null, null, 1), new Node(64, 200, 0, null, null, 1));
const fps = 60;
Env.onKey.Backspace = (e)=>e.preventDefault();
setInterval(() => {

draw.drawBackground(0, 0);
Node.draw(draw, 0, 0);
SandboxMenu.draw(draw);
SandboxMenu.tools();
Env.update();

}, 1000 / fps);

})})});