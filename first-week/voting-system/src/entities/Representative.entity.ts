import { User, users } from "./User.entity.base";

export class Representative extends User {
	constructor(username: string, password: string) {
		super(username, password, "Representative");
	}
}
