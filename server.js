const express = require("express");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use('/pkg', express.static(__dirname + "/pkg"))
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
})

app.listen(process.env.PORT || 80, () => {
	console.log("Server started.");
});