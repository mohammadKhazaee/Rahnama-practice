import jwt from "jsonwebtoken";
import ApplicationError from "../utils/ApplicationError";
import { RequestHandler } from "express";
import { TokenPayload } from "../types/type";

export const isAuth: RequestHandler = (req, res, next) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) throw new ApplicationError("Not authenticated.", 401);

	const token = authHeader.split(" ")[1];
	if (!token) throw new ApplicationError("Not authenticated.", 401);

	let decodedToken;
	try {
		decodedToken = jwt.verify(token, "some secret") as TokenPayload;
	} catch (err) {
		throw new ApplicationError("Token expired", 401);
	}
	if (!decodedToken) throw new ApplicationError("Not authenticated.", 401);

	(req as any).userInfo = {
		username: decodedToken.username,
		role: decodedToken.role,
	};
	next();
};
