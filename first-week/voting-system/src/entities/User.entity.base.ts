import { UserRoles } from "../types/type";
import ApplicationError from "../utils/ApplicationError";
import jwt from "jsonwebtoken";

export const users: User[] = [];

export abstract class User {
	constructor(
		protected username: string,
		protected password: string,
		protected tag: UserRoles
	) {}

	login = (): string | never => {
		const foundUser = users.find((u) => u.username === this.username);

		if (!foundUser) throw new ApplicationError("user does not exists", 409);
		if (foundUser.password !== this.password)
			throw new ApplicationError("wrong password", 422);

		const token = jwt.sign(
			{ username: this.username, role: this.tag },
			"some secret",
			{
				expiresIn: "1h",
			}
		);
		return token;
	};

	signup = (): void => {
		users.push(this);
	};

	static exists = (username: string): boolean => {
		return users.findIndex((u) => u.username === username) !== -1;
	};
}
