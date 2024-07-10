import { User, users } from "./User.entity.base";

export class SimpleUser extends User {
	constructor(username: string, password: string) {
		super(username, password, "SimpleUser");
	}
}
