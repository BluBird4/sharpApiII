"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const resize_1 = __importDefault(require("../resize"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
describe("Test", () => {
    it("simple test case", () => {
        expect(true).toBe(true);
    });
});
describe("Test the files query", () => {
    const request = (0, supertest_1.default)(resize_1.default);
    it("Shouldn't allow wrong urls", () => {
        request.get("/api/images?imagename=ttt").expect(400);
    });
});
// You are checking wether the following url exists or not ; check if the file exists or not !
describe("Actually creates files", () => {
    const request = (0, supertest_1.default)(resize_1.default);
    it("Creates a file with the required dimensions", () => {
        const filepath = path_1.default.join(__dirname, "..", "..", "dist", "imagex400x400.jpg");
        request
            .get("/api/images?filename=image.jpg&height=400&width=400")
            .expect(fs_1.default.existsSync(filepath));
    });
});
//# sourceMappingURL=resizeSpec.js.map