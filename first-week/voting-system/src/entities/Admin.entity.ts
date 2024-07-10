import { User } from "./User.entity.base";

export class Admin extends User {
	constructor(username: string, password: string) {
		super(username, password, "Admin");
	}
}
