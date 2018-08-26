window.Env = {
	mouseX: 0,
	mouseY: 0,
	onKey: [],
	keyDown: [],
	keyPressed: [],
	mouseDown: [],
	mousePressed: [],
	update: () => {
		keyPressed = [];
		mousePressed = [];
	}
};
document.onmousemove = handleMouseMove;
document.onkeydown = (e) => {
	keyDown[e.key] = true;
	keyPressed[e.key] = true;
}
document.onkeyup = (e) => {
	if(onKey[e.key]) onKey[e.key]();
}
function handleMouseMove(event) {
	var dot, eventDoc, doc, body, pageX, pageY;
	event = event || window.event; // IE-ism
	if (event.pageX == null && event.clientX != null) {
		eventDoc = (event.target && event.target.ownerDocument) || document;
		doc = eventDoc.documentElement;
		body = eventDoc.body;
		event.pageX = event.clientX +
		  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
		  (doc && doc.clientLeft || body && body.clientLeft || 0);
		event.pageY = event.clientY +
		  (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
		  (doc && doc.clientTop  || body && body.clientTop  || 0 );
	}
	Env.mouseX = event.pageX;
	Env.mouseY = event.pageY;
}
window.$DESTRUCT = () => {
	delete window.Env;
};