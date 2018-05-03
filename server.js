var express=require("express");
var app=express();

app.listen(80);

app.use(express.static('node_modules'));
app.use(express.static('public'));
