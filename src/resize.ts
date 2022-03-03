import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
const route = express.Router();

async function middleware(req: Request, res: Response, next: NextFunction){
  const heigh: number = +req.query.height;
  const widt: number = +req.query.width;
  const filename = req.query.filename as string;

    if (!filename) {
    res.send("Image name not provided");
  } else if (filename.split(".")[1] !== "jpg") {
    res.send("We only support .jpg images at the moment");
  } else {
    const filepath = filename;
    const exists = fs.existsSync(filepath);
    const jpname = filename.split(".")[0];
    const name = jpname + "x" + widt + "x" + heigh + ".jpg";
    if (exists) {
      const searchname = jpname + "x" + widt + "x" + heigh + ".jpg";
      const exist = fs.existsSync(searchname);
      if (exist) {
        const rsss = __dirname + "/" + searchname;
        res.sendFile(rsss);
      } else {
         // working on the async and await functions in the code : Filepath name
        async function resizeImage() {
          try {
            await sharp(filepath)
              .resize({
                width: widt,
                height: heigh,
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
    if (!exists) {
      res.send("File Doesn't exist");
    }
  }

  next();
}

/*
const middleware = async (
    req: express.Request,
    res: express.Response,
    next: Function
): Promise<void> => {

  const heigh: number = +req.query.height;
  const widt: number = +req.query.width;
  const filename = req.query.filename as string;

    if (!filename) {
    res.send("Image name not provided");
  } else if (filename.split(".")[1] !== "jpg") {
    res.send("We only support .jpg images at the moment");
  } else {
    const filepath = filename;
    const exists = fs.existsSync(filepath);
    const jpname = filename.split(".")[0];
    const name = jpname + "x" + widt + "x" + heigh + ".jpg";
    if (exists) {
      const searchname = jpname + "x" + widt + "x" + heigh + ".jpg";
      const exist = fs.existsSync(searchname);
      if (exist) {
        const rsss = __dirname + "/" + searchname;
        res.sendFile(rsss);
      } else {
         // working on the async and await functions in the code : Filepath name
        async function resizeImage() {
          try {
            await sharp(filepath)
              .resize({
                width: widt,
                height: heigh,
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
    if (!exists) {
      res.send("File Doesn't exist");
    }
  }

  next();

};
*/

route.get("/images", middleware , async (req: Request, res: Response) => {
  console.log("Image resizing api !");
});

export default route;