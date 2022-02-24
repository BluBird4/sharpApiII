import express from "express";
import fs from "fs";
import path from "path"
const port = 8080; // default port to listen
import sharp from "sharp";

const app = express();

app.get("/api/images", (req ,res ) => {
    const heigh:number = (+req.query.height);
    const widt:number = (+req.query.width);
    const filename = req.query.filename as string;

    if(!filename){
        res.send("Image name not provided");
    }
    else if(filename.split(".")[1] !== "jpg")
    {
        res.send("We only support .jpg images at the moment");
    }
    else{
        const filepath = filename;
        console.log(filepath);
        const exists = fs.existsSync(filepath);
        console.log(exists);
        if(exists){
            res.send(

                sharp(filepath).extract({width: widt, height : heigh ,left:60,top:40}).toFile(filename + "" + widt + "x" + heigh).then(function(newFileInfo){
                    console.log("image resized");

                }).catch(function(err){
                    console.log("Error detected");
                })

            );
        }
        if(!exists){
            res.send("Doesn't exist")
        }
    }
}
)

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );