import express from "express";
import routes from "./routes/index";
import control from "./file";
//express application
const app: express.Application = express();

const port = 3000; //determine port

//route
app.use(routes);

//listen to port
app.listen(port, async (): Promise<void> => {
  await control.createThumbPath();
  console.log(`listening on Port: ${port}`);
});

export default app;
