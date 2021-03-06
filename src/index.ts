import express from "express";
const app = express();
const port = 8080; // default port to listen
import route from "./resize";

app.use("/api", route);

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
