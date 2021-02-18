import Router from "koa-router";
import registration from "./registration";

var registrationRouter: Router = new Router();

registrationRouter.post("/registration", registration);

export default registrationRouter;
