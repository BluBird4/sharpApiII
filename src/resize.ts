import express from 'express';   
import sharp from 'sharp';
const resize = express.Router();

//image
let image = 'unsplash.jpg';

//cropped image dist
let out = 'resized.jpg';

//change the res to something variable ? 
sharp(image).extract({width: 1600, height :900,left:60,top:40}).toFile(out).then(function(newFileInfo){
	console.log("image resized");
}).catch(function(err){
	console.log("Error detected");
});

export default resize;