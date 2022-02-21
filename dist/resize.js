"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const resize = express_1.default.Router();
const app = (0, express_1.default)();
const port = 8080; // default port to listen
let name = "";
let height = 0;
let width = 0;
// image
const image = 'unsplash.jpg';
// cropped image dist
const out = 'resized.jpg';
// check wether a url is of correct format or not before handling it ?
// link between home page too
app.get("/sharpapi/filname/:name/height/:height/width/:width", (req, res) => {
    res.send(req.params);
    name = req.params.name;
    height = (req.params.height);
    width = (req.params.width);
    console.log(name);
    console.log(height);
    console.log(width);
});
app.get("/sharp", (req, res) => {
    res.send((0, sharp_1.default)(image).extract({ width: 1000, height: 600, left: 60, top: 40 }).toFile(out).then(function (newFileInfo) {
        console.log("image resized");
    }).catch(function (err) {
        console.log("Error detected");
    }));
});
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
exports.default = resize;
//# sourceMappingURL=resize.js.map