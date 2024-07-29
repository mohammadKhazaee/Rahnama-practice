import { Router } from 'express';

export abstract class BaseRouter {
    protected app: Router = Router();

    constructor() {}

    getApp(): Router {
        return this.app;
    }
}
