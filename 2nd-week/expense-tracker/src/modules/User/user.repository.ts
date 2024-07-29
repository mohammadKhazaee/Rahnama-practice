import { UserDb } from '../../databases/user/user.database';
import { User } from './model/user.model';

export interface IUserRepository {
    findById(userId: number): User | undefined;
}

export class UserRepository implements IUserRepository {
    constructor(private userDb: UserDb) {}

    findById(userId: number): User | undefined {
        return this.userDb.findOne({ id: userId });
    }
}
