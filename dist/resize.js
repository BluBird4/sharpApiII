"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const port = 8080; // default port to listen
const sharp_1 = __importDefault(require("sharp"));
const app = (0, express_1.default)();
app.get("/api/images", (req, res) => {
    const heigh = (+req.query.height);
    const widt = (+req.query.width);
    const filename = req.query.filename;
    if (!filename) {
        res.send("Image name not provided");
    }
    else if (filename.split(".")[1] !== "jpg") {
        res.send("We only support .jpg images at the moment");
    }
    else {
        const filepath = filename;
        console.log(filepath);
        const exists = fs_1.default.existsSync(filepath);
        console.log(exists);
        const jpname = filename.split(".")[0];
        const name = jpname + "x" + widt + "x" + heigh + ".jpg";
        if (exists) {
            const searchname = jpname + "x" + widt + "x" + heigh + ".jpg";
            const exist = fs_1.default.existsSync(searchname);
            if (exist) {
                const rsss = __dirname + "/" + searchname;
                res.sendFile(rsss);
            }
            else {
                (0, sharp_1.default)(filepath).extract({ width: widt, height: heigh, left: 60, top: 40 }).toFile(name).then(function (newFileInfo) {
                    console.log("image resized");
                }).catch(function (err) {
                    console.log("Error detected");
                });
                const rss = __dirname + "/" + name;
                res.sendFile(rss);
            }
        }
        if (!exists) {
            res.send("File Doesn't exist");
        }
    }
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=resize.js.map