const express = require("express");
const app = express();

//json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//folder public
app.use(express.static('public'))

app.get("/", function (request, response){
	response.sendFile(__dirname + "/public/index.html");
})

app.post("/check-equation", function (request, response){
	response.send({hint: "CTTTXXX"});
})

app.listen("8080")