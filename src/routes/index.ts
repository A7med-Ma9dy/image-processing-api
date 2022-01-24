import express from "express";
import images from "./api/images";

const routes: express.Router = express.Router();

routes.use("/api/images", images);

routes.get(
  "/",
  (request: express.Request, response: express.Response): void => {
    response.status(200).send("Server working");
  }
);

export default routes;
