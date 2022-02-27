import express from "express";
import fs from "fs";
import path from "path"
const port = 8080; // default port to listen
import sharp from "sharp";

const app = express();

app.get("/api/images", async (req ,res ) => {
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
        const jpname = filename.split(".")[0];
        const name = jpname + "x" + widt + "x" + heigh + ".jpg";
        if(exists){
            const searchname =  jpname + "x" + widt + "x" + heigh + ".jpg";
            const exist = fs.existsSync(searchname);
            if(exist){
                const rsss = __dirname + "/" + searchname
                res.sendFile(rsss);
            }
            else{
                // working on the async and await functions in the code : Filepath name
               async function resizeImage() {
                    try {
                      await sharp(filepath)
                        .resize({
                          width: widt,
                          height: heigh
                        })
                        .toFile(name);
                    } catch (error) {
                      console.log(error);
                    }
                  }


                await resizeImage();

                const rss = __dirname + "/" + name;
                res.sendFile(rss);

            }
        }
        if(!exists){
            res.send("File Doesn't exist")
        }
    }
}
)

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

export default app;