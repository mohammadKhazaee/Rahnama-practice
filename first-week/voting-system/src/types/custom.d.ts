import * as express from "express";

declare global {
	namespace Express {
		interface Request {
			userInfo?: { username: string; role: any };
		}
	}
}
