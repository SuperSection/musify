import { Request as ExpressRequest } from "express";
import { AuthObject } from "@clerk/backend";

declare module "express" {
  export interface Request extends ExpressRequest {
    auth?: AuthObject;
    rawBody?: Buffer;
  }
}
