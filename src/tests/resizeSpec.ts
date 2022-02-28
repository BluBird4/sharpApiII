import supertest from "supertest";
import app from '../resize';
import path from "path";
import fs from 'fs';

describe("Test", () => {
    it("simple test case", () => {
        expect(true).toBe(true);
    });
});


describe("Test the files query" , ()=> {
    const request = supertest(app);
    it("Shouldn't allow wrong urls", () => {
    request
    .get("/api/images?imagename=ttt")
    .expect(400);
    } )
})

describe("Actually creates files" , ()=> {
    const request = supertest(app);
    it("Creates a file with the required dimensions", () => {
        const filepath  = path.join(
            __dirname,
            "..",
            "..",
            "dist",
            "imagex400x400.jpg"
        );
    request
    .get("/api/images?filename=image.jpg&height=400&width=400")
    .expect(200);
    (fs.existsSync(filepath))
    } )
})