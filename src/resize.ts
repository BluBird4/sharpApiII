import express from 'express';
import sharp from 'sharp';
const resize = express.Router();
const app = express();
const port = 8080; // default port to listen
let name:string =""; let height:number = 0; let width:number =0;

// image
const image = 'unsplash.jpg';

// cropped image dist
const out = 'resized.jpg';

// check wether a url is of correct format or not before handling it ?
// link between home page too
app.get("/sharpapi/filname/:name/height/:height/width/:width", (req,res) => {
    res.send(req.params)
    name = req.params.name;
    height = (((req.params.height) as unknown) as number);
    width = (((req.params.width) as unknown) as number);

    console.log(name);console.log(height);console.log(width);
} )

app.get( "/sharp", ( req, res ) => {
    res.send(
sharp(image).extract({width: 1000, height :600,left:60,top:40}).toFile(out).then(function(newFileInfo){
	console.log("image resized");

}).catch(function(err){
	console.log("Error detected");
})
     );
} );

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

export default resize;