import { UserDb } from '../../databases/user/user.database';
import { User } from './model/user.model';

export class UserRepository {
    constructor(private userDb: UserDb) {}

    findById(userId: number): User | undefined {
        return this.userDb.findOne({ id: userId });
    }
}
